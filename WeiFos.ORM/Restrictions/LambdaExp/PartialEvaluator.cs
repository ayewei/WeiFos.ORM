﻿// Copyright (c) Microsoft Corporation.  All rights reserved.
// This source code is made available under the terms of the Microsoft Public License (MS-PL)
// 该源代码是根据Microsoft公共许可证(ms - pl)的条款提供的

using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace WeiFos.ORM.Restrictions.LambdaExp
{
    /// <summary>
    /// Rewrites an expression tree so that locally isolatable sub-expressions are evaluated and converted into ConstantExpression nodes.
    /// 重写表达式树，以便将本地的可隔离子表达式计算并转换为ConstantExpression节点。
    /// </summary>
    public static class PartialEvaluator
    {

        /// <summary>
        /// Performs evaluation & replacement of independent sub-trees
        /// 单独处理表达式
        /// </summary>
        /// <param name="expression">The root of the expression tree.</param>
        /// <returns>A new tree with sub-trees evaluated and replaced.</returns>
        public static Expression Eval(Expression expression)
        {
            return Eval(expression, null, null);
        }


        /// <summary>
        /// Performs evaluation & replacement of independent sub-trees
        /// 单独处理表达式
        /// </summary>
        /// <param name="expression">The root of the expression tree.</param>
        /// <param name="fnCanBeEvaluated">A function that decides whether a given expression node can be part of the local function.</param>
        /// <returns>A new tree with sub-trees evaluated and replaced.</returns>
        public static Expression Eval(Expression expression, Func<Expression, bool> fnCanBeEvaluated)
        {
            return Eval(expression, fnCanBeEvaluated, null);
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="expression"></param>
        /// <param name="fnCanBeEvaluated"></param>
        /// <param name="fnPostEval"></param>
        /// <returns></returns>
		public static Expression Eval(Expression expression, Func<Expression, bool> fnCanBeEvaluated, Func<ConstantExpression, Expression> fnPostEval)
        {
            if (fnCanBeEvaluated == null)
            {
                fnCanBeEvaluated = PartialEvaluator.CanBeEvaluatedLocally;
            }
            return SubtreeEvaluator.Eval(Nominator.Nominate(fnCanBeEvaluated, expression), fnPostEval, expression);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="expression"></param>
        /// <returns></returns>
		private static bool CanBeEvaluatedLocally(Expression expression)
        {
            return expression.NodeType != ExpressionType.Parameter;
        }

        /// <summary>
        /// Evaluates & replaces sub-trees when first candidate is reached (top-down)
        /// </summary>
        class SubtreeEvaluator : ExpressionVisitor
        {
            /// <summary>
            /// 
            /// </summary>
			HashSet<Expression> candidates;
            /// <summary>
            /// 
            /// </summary>
			Func<ConstantExpression, Expression> onEval;
            /// <summary>
            /// 
            /// </summary>
            /// <param name="candidates"></param>
            /// <param name="onEval"></param>
			private SubtreeEvaluator(HashSet<Expression> candidates, Func<ConstantExpression, Expression> onEval)
            {
                this.candidates = candidates;
                this.onEval = onEval;
            }
            /// <summary>
            /// 
            /// </summary>
            /// <param name="candidates"></param>
            /// <param name="onEval"></param>
            /// <param name="exp"></param>
            /// <returns></returns>
			internal static Expression Eval(HashSet<Expression> candidates, Func<ConstantExpression, Expression> onEval, Expression exp)
            {
                return new SubtreeEvaluator(candidates, onEval).Visit(exp);
            }
            /// <summary>
            /// 
            /// </summary>
            /// <param name="exp"></param>
            /// <returns></returns>
			public override Expression Visit(Expression exp)
            {
                if (exp == null)
                {
                    return null;
                }
                if (this.candidates.Contains(exp))
                {
                    return this.Evaluate(exp);
                }
                return base.Visit(exp);
            }
            /// <summary>
            /// 
            /// </summary>
            /// <param name="e"></param>
            /// <returns></returns>
			private Expression PostEval(ConstantExpression e)
            {
                if (this.onEval != null)
                {
                    return this.onEval(e);
                }
                return e;
            }
            /// <summary>
            /// 
            /// </summary>
            /// <param name="e"></param>
            /// <returns></returns>
			private Expression Evaluate(Expression e)
            {
                Type type = e.Type;
                if (e.NodeType == ExpressionType.Convert)
                {
                    // check for unnecessary convert & strip them
                    var u = (UnaryExpression)e;
                    if (TypeHelper.GetNonNullableType(u.Operand.Type) == TypeHelper.GetNonNullableType(type))
                    {
                        e = ((UnaryExpression)e).Operand;
                    }
                }
                if (e.NodeType == ExpressionType.Constant)
                {
                    // in case we actually threw out a nullable conversion above, simulate it here
                    // don't post-eval nodes that were already constants
                    if (e.Type == type)
                    {
                        return e;
                    }
                    else if (TypeHelper.GetNonNullableType(e.Type) == TypeHelper.GetNonNullableType(type))
                    {
                        return Expression.Constant(((ConstantExpression)e).Value, type);
                    }
                }
                var me = e as MemberExpression;
                if (me != null)
                {
                    // member accesses off of constant's are common, and yet since these partial evals
                    // are never re-used, using reflection to access the member is faster than compiling  
                    // and invoking a lambda
                    var ce = me.Expression as ConstantExpression;
                    if (ce != null)
                    {
                        return this.PostEval(Expression.Constant(me.Member.GetValue(ce.Value), type));
                    }
                }
                if (type.IsValueType)
                {
                    e = Expression.Convert(e, typeof(object));
                }
                Expression<Func<object>> lambda = Expression.Lambda<Func<object>>(e);
                #if NOREFEMIT
                Func<object> fn = ExpressionEvaluator.CreateDelegate(lambda);
                #else
                Func<object> fn = lambda.Compile();
                #endif
                return this.PostEval(Expression.Constant(fn(), type));
            }
        }

        /// <summary>
        /// Performs bottom-up analysis to determine which nodes can possibly
        /// be part of an evaluated sub-tree.
        /// </summary>
        class Nominator : ExpressionVisitor
        {
            /// <summary>
            /// 
            /// </summary>
			Func<Expression, bool> fnCanBeEvaluated;
            /// <summary>
            /// 
            /// </summary>
			HashSet<Expression> candidates;
            /// <summary>
            /// 
            /// </summary>
			bool cannotBeEvaluated;
            /// <summary>
            /// 
            /// </summary>
            /// <param name="fnCanBeEvaluated"></param>
			private Nominator(Func<Expression, bool> fnCanBeEvaluated)
            {
                this.candidates = new HashSet<Expression>();
                this.fnCanBeEvaluated = fnCanBeEvaluated;
            }
            /// <summary>
            /// 
            /// </summary>
            /// <param name="fnCanBeEvaluated"></param>
            /// <param name="expression"></param>
            /// <returns></returns>
			internal static HashSet<Expression> Nominate(Func<Expression, bool> fnCanBeEvaluated, Expression expression)
            {
                Nominator nominator = new Nominator(fnCanBeEvaluated);
                nominator.Visit(expression);
                return nominator.candidates;
            }
            /// <summary>
            /// 
            /// </summary>
            /// <param name="c"></param>
            /// <returns></returns>
			protected override Expression VisitConstant(ConstantExpression c)
            {
                return base.VisitConstant(c);
            }
            /// <summary>
            /// 
            /// </summary>
            /// <param name="expression"></param>
            /// <returns></returns>
			public override Expression Visit(Expression expression)
            {
                if (expression != null)
                {
                    bool saveCannotBeEvaluated = this.cannotBeEvaluated;
                    this.cannotBeEvaluated = false;
                    base.Visit(expression);
                    if (!this.cannotBeEvaluated)
                    {
                        if (this.fnCanBeEvaluated(expression))
                        {
                            this.candidates.Add(expression);
                        }
                        else
                        {
                            this.cannotBeEvaluated = true;
                        }
                    }
                    this.cannotBeEvaluated |= saveCannotBeEvaluated;
                }
                return expression;
            }

        }
    }
}