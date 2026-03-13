import { AssessmentQuestion, LessonProblem } from '@/types';

// ============================================================
// INTEGRATED MATH 1 HONORS — Hardcoded Content
// 11 units, 30 topics
// 22 assessment questions, 30 lessons, 150 practice problems
// ============================================================

export const QUESTIONS: AssessmentQuestion[] = [
  // ---- m1-equations (Equations & Inequalities) ----
  {
    unitId: 'm1-equations',
    question: 'Solve for $x$: $3(2x - 4) = 2(x + 6)$',
    options: ['$x = 3$', '$x = 4$', '$x = 6$', '$x = 8$'],
    correctIndex: 2,
    explanation: 'Distribute: $6x - 12 = 2x + 12$. Subtract $2x$: $4x - 12 = 12$. Add 12: $4x = 24$, so $x = 6$.'
  },
  {
    unitId: 'm1-equations',
    question: 'Solve the literal equation $A = \\frac{1}{2}h(b_1 + b_2)$ for $b_1$.',
    options: ['$b_1 = \\frac{2A}{h} - b_2$', '$b_1 = \\frac{A - b_2}{2h}$', '$b_1 = 2Ah - b_2$', '$b_1 = \\frac{A}{h} - b_2$'],
    correctIndex: 0,
    explanation: 'Multiply both sides by 2: $2A = h(b_1 + b_2)$. Divide by $h$: $\\frac{2A}{h} = b_1 + b_2$. Subtract $b_2$: $b_1 = \\frac{2A}{h} - b_2$.'
  },
  // ---- m1-twovareq (Two-Variable Equations) ----
  {
    unitId: 'm1-twovareq',
    question: 'What is the slope of the line passing through $(-2, 5)$ and $(4, -7)$?',
    options: ['$2$', '$-2$', '$\\frac{1}{2}$', '$-\\frac{1}{2}$'],
    correctIndex: 1,
    explanation: 'Slope $= \\frac{-7 - 5}{4 - (-2)} = \\frac{-12}{6} = -2$.'
  },
  {
    unitId: 'm1-twovareq',
    question: 'Solve the system: $2x + y = 7$ and $x - y = 2$. What is $x$?',
    options: ['$x = 1$', '$x = 2$', '$x = 3$', '$x = 4$'],
    correctIndex: 2,
    explanation: 'Add the equations: $3x = 9$, so $x = 3$. Then $y = 7 - 2(3) = 1$.'
  },
  // ---- m1-units (Units & Variation) ----
  {
    unitId: 'm1-units',
    question: 'Convert 45 miles per hour to feet per second. (1 mile = 5280 ft, 1 hour = 3600 s)',
    options: ['$55$ ft/s', '$66$ ft/s', '$72$ ft/s', '$88$ ft/s'],
    correctIndex: 1,
    explanation: '$45 \\times \\frac{5280}{3600} = 45 \\times \\frac{22}{15} = \\frac{990}{15} = 66$ ft/s.'
  },
  {
    unitId: 'm1-units',
    question: 'If $y$ varies directly with $x$ and $y = 15$ when $x = 3$, find $y$ when $x = 7$.',
    options: ['$y = 21$', '$y = 25$', '$y = 35$', '$y = 45$'],
    correctIndex: 2,
    explanation: '$y = kx$. From $15 = 3k$, $k = 5$. So $y = 5(7) = 35$.'
  },
  // ---- m1-radrats (Radicals & Rationals) ----
  {
    unitId: 'm1-radrats',
    question: 'Simplify $\\sqrt{72}$.',
    options: ['$6\\sqrt{2}$', '$4\\sqrt{3}$', '$3\\sqrt{8}$', '$8\\sqrt{3}$'],
    correctIndex: 0,
    explanation: '$\\sqrt{72} = \\sqrt{36 \\cdot 2} = 6\\sqrt{2}$.'
  },
  {
    unitId: 'm1-radrats',
    question: 'Simplify $\\frac{x^2 - 9}{x^2 + 5x + 6}$.',
    options: ['$\\frac{x - 3}{x + 2}$', '$\\frac{x + 3}{x + 2}$', '$\\frac{x - 3}{x + 3}$', '$\\frac{x + 3}{x - 2}$'],
    correctIndex: 0,
    explanation: 'Factor: $\\frac{(x-3)(x+3)}{(x+2)(x+3)} = \\frac{x-3}{x+2}$, with $x \\neq -3$.'
  },
  // ---- m1-functions (Functions) ----
  {
    unitId: 'm1-functions',
    question: 'If $f(x) = 3x^2 - 2x + 1$, find $f(-2)$.',
    options: ['$9$', '$13$', '$17$', '$21$'],
    correctIndex: 2,
    explanation: '$f(-2) = 3(4) - 2(-2) + 1 = 12 + 4 + 1 = 17$.'
  },
  {
    unitId: 'm1-functions',
    question: 'The graph of $f(x) = |x|$ is shifted right 3 and up 2. Which function describes the new graph?',
    options: ['$f(x) = |x - 3| + 2$', '$f(x) = |x + 3| + 2$', '$f(x) = |x - 3| - 2$', '$f(x) = |x + 2| + 3$'],
    correctIndex: 0,
    explanation: 'Right 3 replaces $x$ with $x - 3$; up 2 adds 2: $f(x) = |x - 3| + 2$.'
  },
  // ---- m1-absval (Absolute Value) ----
  {
    unitId: 'm1-absval',
    question: 'Solve: $|2x - 5| = 11$',
    options: ['$x = 3$ or $x = 8$', '$x = -3$ or $x = 8$', '$x = 8$ only', '$x = -8$ or $x = 3$'],
    correctIndex: 1,
    explanation: '$2x - 5 = 11$ gives $x = 8$. $2x - 5 = -11$ gives $x = -3$. Solutions: $x = -3$ or $x = 8$.'
  },
  {
    unitId: 'm1-absval',
    question: 'Solve: $|3x + 1| < 7$',
    options: ['$x < 2$ or $x > -\\frac{8}{3}$', '$-\\frac{8}{3} < x < 2$', '$x < -\\frac{8}{3}$ or $x > 2$', '$-2 < x < \\frac{8}{3}$'],
    correctIndex: 1,
    explanation: '$-7 < 3x + 1 < 7$. Subtract 1: $-8 < 3x < 6$. Divide by 3: $-\\frac{8}{3} < x < 2$.'
  },
  // ---- m1-exponents (Exponents) ----
  {
    unitId: 'm1-exponents',
    question: 'Simplify: $\\frac{(2x^3)^2 \\cdot x^{-4}}{4x^5}$',
    options: ['$x^{-7}$', '$4x^{-3}$', '$\\frac{1}{x^7}$', '$\\frac{1}{x^3}$'],
    correctIndex: 3,
    explanation: '$(2x^3)^2 = 4x^6$. So $\\frac{4x^6 \\cdot x^{-4}}{4x^5} = \\frac{4x^2}{4x^5} = x^{-3} = \\frac{1}{x^3}$.'
  },
  {
    unitId: 'm1-exponents',
    question: 'A bacteria population doubles every 3 hours. Starting with 500, how many after 12 hours?',
    options: ['$2000$', '$4000$', '$6000$', '$8000$'],
    correctIndex: 3,
    explanation: 'Doubles $12 \\div 3 = 4$ times. $500 \\times 2^4 = 500 \\times 16 = 8000$.'
  },
  // ---- m1-polynomials (Polynomials) ----
  {
    unitId: 'm1-polynomials',
    question: 'Expand: $(3x - 2)(2x + 5)$',
    options: ['$6x^2 + 11x - 10$', '$6x^2 + 19x - 10$', '$6x^2 - 11x - 10$', '$6x^2 + 11x + 10$'],
    correctIndex: 0,
    explanation: 'FOIL: $6x^2 + 15x - 4x - 10 = 6x^2 + 11x - 10$.'
  },
  {
    unitId: 'm1-polynomials',
    question: 'Factor completely: $2x^2 - 18$',
    options: ['$2(x - 3)(x + 3)$', '$2(x^2 - 9)$', '$2(x - 9)$', '$(2x - 6)(x + 3)$'],
    correctIndex: 0,
    explanation: 'GCF: $2(x^2 - 9)$. Difference of squares: $2(x - 3)(x + 3)$.'
  },
  // ---- m1-sequences (Sequences) ----
  {
    unitId: 'm1-sequences',
    question: 'Find the 20th term of: $5, 11, 17, 23, \\ldots$',
    options: ['$113$', '$119$', '$125$', '$131$'],
    correctIndex: 1,
    explanation: '$d = 6$, $a_1 = 5$. $a_{20} = 5 + 19(6) = 5 + 114 = 119$.'
  },
  {
    unitId: 'm1-sequences',
    question: 'Find the 6th term of: $3, 12, 48, \\ldots$',
    options: ['$768$', '$1536$', '$3072$', '$12288$'],
    correctIndex: 2,
    explanation: '$r = 4$, $a_1 = 3$. $a_6 = 3 \\cdot 4^5 = 3 \\cdot 1024 = 3072$.'
  },
  // ---- m1-geometry (Geometry) ----
  {
    unitId: 'm1-geometry',
    question: 'Two parallel lines are cut by a transversal. One alternate interior angle is $62°$. What is the co-interior angle on the same side?',
    options: ['$62°$', '$118°$', '$128°$', '$152°$'],
    correctIndex: 1,
    explanation: 'Co-interior angles are supplementary: $180° - 62° = 118°$.'
  },
  {
    unitId: 'm1-geometry',
    question: 'Find the distance between $(1, -3)$ and $(-5, 5)$.',
    options: ['$8$', '$10$', '$12$', '$14$'],
    correctIndex: 1,
    explanation: '$d = \\sqrt{(-6)^2 + (8)^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$.'
  },
  // ---- m1-statistics (Statistics) ----
  {
    unitId: 'm1-statistics',
    question: 'Five-number summary: min=12, $Q_1$=18, median=25, $Q_3$=32, max=45. What is the IQR?',
    options: ['$7$', '$13$', '$14$', '$33$'],
    correctIndex: 2,
    explanation: 'IQR $= Q_3 - Q_1 = 32 - 18 = 14$.'
  },
  {
    unitId: 'm1-statistics',
    question: 'A scatter plot has $r = -0.92$. Which best describes the relationship?',
    options: ['Weak positive linear', 'Strong positive linear', 'Weak negative linear', 'Strong negative linear'],
    correctIndex: 3,
    explanation: '$r = -0.92$ is close to $-1$: strong negative linear relationship.'
  },
];

// ============================================================
// LESSONS (30 total, 1 per topic)
// ============================================================
export const LESSONS: Record<string, string> = {
'm1-eq-1': `## Solving Linear Equations

> **Big picture:** Linear equations are the backbone of algebra. Every science, engineering, and finance problem eventually reduces to solving equations.

### The Ideas

> **Key Idea 1:** An equation is a balance — whatever you do to one side, you must do to the other.

> **Key Idea 2:** Isolate $x$ by undoing operations in reverse order (addition/subtraction first, then multiplication/division).

**Example:** Solve $4x - 7 = 2x + 9$
$$4x - 7 = 2x + 9$$
$$2x = 16$$
$$x = 8$$

> **Key Idea 3:** When fractions appear, multiply every term by the LCD to clear them.

**Example:** Solve $\\frac{x}{3} + \\frac{x}{4} = 7$. Multiply by 12: $4x + 3x = 84$, so $7x = 84$, $x = 12$.

> ⚠️ **Common trap:** When distributing a negative: $-(3x - 5) = -3x + 5$, NOT $-3x - 5$.

### Worked Examples

**Example 1:** $2(3x + 1) - 4 = 5x + 8$
$6x + 2 - 4 = 5x + 8 \\Rightarrow 6x - 2 = 5x + 8 \\Rightarrow x = 10$

**Example 2:** $\\frac{2x-1}{3} = \\frac{x+5}{2}$. Multiply by 6: $2(2x-1) = 3(x+5)$, $4x - 2 = 3x + 15$, $x = 17$.

### Cheat Sheet
- Distribute before combining like terms
- LCD trick: multiply all terms by the common denominator
- Variables on both sides: collect $x$-terms on one side, constants on the other
- Always verify by substituting back
`,

'm1-eq-2': `## Solving Linear Inequalities

> **Big picture:** Inequalities describe ranges of values — budgets, speed limits, capacity constraints. The solution is a set of numbers, not just one.

### The Ideas

> **Key Idea 1:** Solve like equations, but **flip the inequality when multiplying or dividing by a negative**.

**Example:** $-3x + 2 > 14 \\Rightarrow -3x > 12 \\Rightarrow x < -4$

> **Key Idea 2:** Compound inequalities: "and" = intersection, "or" = union.

**Example:** $-1 \\leq 2x + 3 < 9$. Subtract 3: $-4 \\leq 2x < 6$. Divide by 2: $-2 \\leq x < 3$.

> ⚠️ **Common trap:** Forgetting to flip the inequality sign when dividing by a negative number.

### Worked Examples

**Example 1:** $5 - 2x \\geq 11 \\Rightarrow -2x \\geq 6 \\Rightarrow x \\leq -3$

**Example 2:** $3x + 1 > 7$ or $2x - 5 < -9$. First: $x > 2$. Second: $x < -2$. Solution: $x < -2$ or $x > 2$.

### Cheat Sheet
- Open circle for $<, >$; closed circle for $\\leq, \\geq$
- Flip inequality when multiplying/dividing by negative
- "And" = overlap; "Or" = combine
`,

'm1-eq-3': `## Literal Equations

> **Big picture:** Formulas like $F = ma$, $A = \\pi r^2$, and $I = Prt$ are literal equations. Rearranging them for any variable is a core skill.

### The Ideas

> **Key Idea:** Treat every other variable as a constant. Isolate the target using inverse operations.

**Example:** Solve $ax + b = c$ for $x$: $x = \\frac{c - b}{a}$

> **Key Idea 2:** If the target appears in multiple terms, factor it out.

**Example:** Solve $ab + ac = d$ for $a$: $a(b + c) = d$, so $a = \\frac{d}{b + c}$

> ⚠️ **Common trap:** Not factoring when the variable appears more than once.

### Worked Examples

**Example 1:** Solve $P = 2l + 2w$ for $w$: $w = \\frac{P - 2l}{2}$

**Example 2:** Solve $\\frac{1}{f} = \\frac{1}{d_1} + \\frac{1}{d_2}$ for $d_1$: $\\frac{1}{d_1} = \\frac{1}{f} - \\frac{1}{d_2} = \\frac{d_2 - f}{fd_2}$, so $d_1 = \\frac{fd_2}{d_2 - f}$.

### Cheat Sheet
- Treat other variables as numbers
- If the variable appears twice, factor it out
- For reciprocal equations: combine fractions, then flip
- Note restrictions (denominators $\\neq 0$)
`,

'm1-tv-1': `## Slope & Rate of Change

> **Big picture:** Slope measures steepness — how fast one quantity changes relative to another. It is the foundation for calculus.

### The Ideas

> **Key Idea:** $m = \\frac{y_2 - y_1}{x_2 - x_1}$

**Example:** Slope between $(1, 3)$ and $(4, 15)$: $m = \\frac{12}{3} = 4$

> **Key Idea 2:** Positive slope = rises; negative = falls; zero = horizontal; undefined = vertical.

> **Key Idea 3:** In context, slope is a rate of change (e.g., miles per hour, dollars per item).

> ⚠️ **Common trap:** Subtract in the same order: $\\frac{y_2 - y_1}{x_2 - x_1}$. Swapping one gives the wrong sign.

### Worked Examples

**Example 1:** Table: $(0,1),(2,7),(4,13)$. $m = \\frac{7-1}{2-0} = 3$.

**Example 2:** Through $(-3, 8)$ and $(5, -4)$: $m = \\frac{-12}{8} = -\\frac{3}{2}$.

### Cheat Sheet
- $m = \\frac{\\Delta y}{\\Delta x}$
- Parallel lines: equal slopes
- Perpendicular lines: $m_1 \\cdot m_2 = -1$
- Horizontal: $m = 0$; Vertical: undefined
`,

'm1-tv-2': `## Forms of Linear Equations

> **Big picture:** The same line can be written multiple ways. Each form highlights different information.

### The Ideas

> **Key Idea 1:** Slope-intercept: $y = mx + b$ ($m$ = slope, $b$ = $y$-intercept)

> **Key Idea 2:** Point-slope: $y - y_1 = m(x - x_1)$

> **Key Idea 3:** Standard form: $Ax + By = C$ ($A, B, C$ integers, $A > 0$)

**Example:** Line through $(2, 5)$ with slope 3: $y - 5 = 3(x - 2) \\Rightarrow y = 3x - 1 \\Rightarrow 3x - y = 1$.

> ⚠️ **Common trap:** When converting point-slope to slope-intercept, distribute AND add $y_1$.

### Worked Examples

**Example 1:** Convert $4x - 2y = 10$: $y = 2x - 5$.

**Example 2:** Line through $(1, 4)$ and $(3, 10)$: $m = 3$, so $y = 3x + 1$.

### Cheat Sheet
- Slope-intercept: read slope and $y$-intercept directly
- Point-slope: use any known point + slope
- Standard form: good for intercepts and systems
`,

'm1-tv-3': `## Systems of Equations

> **Big picture:** Systems model situations where two conditions must hold simultaneously — break-even points, mixture problems, motion problems.

### The Ideas

> **Key Idea 1:** Graphing: solution = intersection point.

> **Key Idea 2:** Substitution: solve one equation for a variable, plug into the other.

**Example:** $y = 2x + 1$ and $3x + y = 11$. Substitute: $3x + 2x + 1 = 11$, $5x = 10$, $x = 2$, $y = 5$.

> **Key Idea 3:** Elimination: add/subtract equations to eliminate a variable.

**Example:** $2x + 3y = 12$ and $2x - y = 4$. Subtract: $4y = 8$, $y = 2$, $x = 3$.

> ⚠️ **Common trap:** With elimination, you may need to multiply one equation by a constant first.

### Worked Examples

**Example 1:** $x = 3y - 1$ and $2x + y = 12$. $2(3y-1) + y = 12$, $7y = 14$, $y = 2$, $x = 5$.

**Example 2:** $3x + 2y = 16$ and $x - 2y = 0$. Add: $4x = 16$, $x = 4$, $y = 2$.

### Cheat Sheet
- One solution: lines intersect
- No solution: parallel lines
- Infinite solutions: same line
- Substitution: best when a variable is already isolated
- Elimination: best when coefficients are easy to match
`,

'm1-tv-4': `## Systems of Inequalities

> **Big picture:** Systems of inequalities define a region of solutions. They are used in linear programming and optimization.

### The Ideas

> **Key Idea 1:** Graph each inequality as a half-plane. Solid line for $\\leq$/$\\geq$; dashed for $<$/$>$.

> **Key Idea 2:** The solution is the overlap of all shaded regions.

> **Key Idea 3:** Test a point (often the origin) to determine which side to shade.

**Example:** $y \\leq 2x + 3$ and $y > -x + 1$. Graph both, shade appropriately, and find the overlap.

> ⚠️ **Common trap:** $<$ and $>$ use dashed lines — boundary points are NOT included.

### Worked Examples

**Example 1:** Is $(2, 3)$ in the solution of $y \\leq x + 4$ and $y > 2x - 1$? Check: $3 \\leq 6$? Yes. $3 > 3$? No. Not in the solution.

**Example 2:** At least 10 total items, pencils at most twice pens: $x + y \\geq 10$, $y \\leq 2x$.

### Cheat Sheet
- Solid line: $\\leq$/$\\geq$; dashed: $<$/$>$
- Test the origin unless the line passes through it
- Solution = intersection of all shaded regions
`,

'm1-un-1': `## Unit Conversions

> **Big picture:** Dimensional analysis lets you convert between any units by treating units as algebraic quantities that cancel.

### The Ideas

> **Key Idea:** Multiply by conversion factors (fractions equal to 1) so unwanted units cancel.

**Example:** $5 \\text{ km} \\times \\frac{1000 \\text{ m}}{1 \\text{ km}} = 5000 \\text{ m}$

> **Key Idea 2:** For compound units, convert one unit at a time.

**Example:** $90 \\frac{\\text{km}}{\\text{hr}} \\times \\frac{1000}{1} \\times \\frac{1}{3600} = 25 \\text{ m/s}$

> ⚠️ **Common trap:** The unit you want to cancel must be on the opposite side of the fraction bar.

### Worked Examples

**Example 1:** $2.5 \\text{ hr} \\times 60 \\times 60 = 9000 \\text{ s}$

**Example 2:** $15 \\frac{\\text{ft}}{\\text{s}} \\times \\frac{3600}{5280} \\approx 10.23 \\text{ mph}$

### Cheat Sheet
- Chain conversion factors so units cancel
- Area: square the factor; Volume: cube it
- Common: 1 mi = 5280 ft, 1 hr = 3600 s, 1 kg = 2.205 lb
`,

'm1-un-2': `## Direct & Inverse Variation

> **Big picture:** Many real relationships are proportional. Distance is directly proportional to time; pressure is inversely proportional to volume.

### The Ideas

> **Key Idea 1:** Direct variation: $y = kx$. The ratio $y/x$ is constant.

**Example:** $y = 12$ when $x = 4$: $k = 3$, so $y = 3x$.

> **Key Idea 2:** Inverse variation: $y = k/x$. The product $xy$ is constant.

**Example:** $y = 6$ when $x = 5$: $k = 30$, so $y = 30/x$.

> ⚠️ **Common trap:** Direct = constant ratio; Inverse = constant product. Don't mix them up.

### Worked Examples

**Example 1:** Cost varies directly with weight. 3 lbs = \\$7.50. Cost of 8 lbs? $k = 2.50$, $C = \\$20.00$.

**Example 2:** Time inversely varies with rate. At 10 gal/min it takes 120 min. At 15 gal/min? $k = 1200$, $t = 80$ min.

### Cheat Sheet
- Direct: $y = kx$, find $k = y/x$
- Inverse: $y = k/x$, find $k = xy$
- Direct graph: line through origin
- Inverse graph: hyperbola
`,

'm1-rr-1': `## Simplifying Radicals

> **Big picture:** Radicals appear throughout geometry and physics. Simplifying means extracting perfect square factors.

### The Ideas

> **Key Idea 1:** $\\sqrt{ab} = \\sqrt{a} \\cdot \\sqrt{b}$. Pull out perfect squares.

**Example:** $\\sqrt{50} = \\sqrt{25 \\cdot 2} = 5\\sqrt{2}$

> **Key Idea 2:** For cube roots: $\\sqrt[3]{54} = \\sqrt[3]{27 \\cdot 2} = 3\\sqrt[3]{2}$

> ⚠️ **Common trap:** $\\sqrt{a + b} \\neq \\sqrt{a} + \\sqrt{b}$. Example: $\\sqrt{9+16} = 5$, but $\\sqrt{9}+\\sqrt{16} = 7$.

### Worked Examples

**Example 1:** $\\sqrt{180} = \\sqrt{36 \\cdot 5} = 6\\sqrt{5}$

**Example 2:** $3\\sqrt{28} = 3 \\cdot 2\\sqrt{7} = 6\\sqrt{7}$

### Cheat Sheet
- Perfect squares: $1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144$
- $\\sqrt{a^2 b} = a\\sqrt{b}$
- Always look for the largest perfect square factor
`,

'm1-rr-2': `## Operations with Radicals

> **Big picture:** After simplifying, you can add, subtract, multiply radicals and rationalize denominators.

### The Ideas

> **Key Idea 1:** Only add/subtract radicals with the same radicand: $3\\sqrt{5} + 7\\sqrt{5} = 10\\sqrt{5}$

> **Key Idea 2:** Multiply freely: $\\sqrt{3} \\cdot \\sqrt{12} = \\sqrt{36} = 6$

> **Key Idea 3:** Rationalize: $\\frac{5}{\\sqrt{3}} = \\frac{5\\sqrt{3}}{3}$

> ⚠️ **Common trap:** Simplify first, then add. $\\sqrt{12} + \\sqrt{27} = 2\\sqrt{3} + 3\\sqrt{3} = 5\\sqrt{3}$.

### Worked Examples

**Example 1:** $\\sqrt{50} - \\sqrt{18} = 5\\sqrt{2} - 3\\sqrt{2} = 2\\sqrt{2}$

**Example 2:** $\\frac{4}{\\sqrt{6}} = \\frac{4\\sqrt{6}}{6} = \\frac{2\\sqrt{6}}{3}$

### Cheat Sheet
- Like radicals: same index AND same radicand
- $\\sqrt{a} \\cdot \\sqrt{b} = \\sqrt{ab}$
- Rationalize by multiplying by $\\frac{\\sqrt{n}}{\\sqrt{n}}$
- For binomial denominators, multiply by the conjugate
`,

'm1-rr-3': `## Rational Expressions Intro

> **Big picture:** Rational expressions are fractions with polynomials. Simplify by canceling common factors.

### The Ideas

> **Key Idea 1:** Factor numerator and denominator, then cancel common factors.

**Example:** $\\frac{x^2-4}{x+2} = \\frac{(x-2)(x+2)}{x+2} = x-2$ (where $x \\neq -2$)

> **Key Idea 2:** State restrictions: values that make any denominator zero.

> ⚠️ **Common trap:** $\\frac{x+3}{x+5} \\neq \\frac{3}{5}$. You can only cancel factors, not terms.

### Worked Examples

**Example 1:** $\\frac{2x^2+6x}{4x} = \\frac{2x(x+3)}{4x} = \\frac{x+3}{2}$ ($x \\neq 0$)

**Example 2:** $\\frac{x^2-5x+6}{x^2-4} = \\frac{(x-2)(x-3)}{(x-2)(x+2)} = \\frac{x-3}{x+2}$ ($x \\neq 2$)

### Cheat Sheet
- Factor completely before canceling
- Only cancel factors, never terms
- $\\frac{a-b}{b-a} = -1$
- State domain restrictions
`,

'm1-fn-1': `## Function Notation & Evaluation

> **Big picture:** Functions formalize the input-output relationship: put in $x$, get out $f(x)$.

### The Ideas

> **Key Idea 1:** $f(x)$ means "the output of $f$ when input is $x$." NOT $f$ times $x$.

> **Key Idea 2:** To evaluate $f(a)$, replace every $x$ with $a$.

**Example:** $f(x) = x^2 - 3x + 1$, $f(4) = 16 - 12 + 1 = 5$.

> **Key Idea 3:** Domain = valid inputs; Range = possible outputs.

> ⚠️ **Common trap:** $f(a+b) \\neq f(a) + f(b)$ in general.

### Worked Examples

**Example 1:** $g(x) = 2x + 5$; $g(3a) = 6a + 5$

**Example 2:** $h(x) = x^2 + 1$; $h(x+2) = x^2 + 4x + 5$

### Cheat Sheet
- Use parentheses when substituting
- Domain restrictions: no $\\sqrt{\\text{negative}}$, no division by zero
- Vertical line test: each $x$ gives at most one $y$
`,

'm1-fn-2': `## Function Transformations

> **Big picture:** Shift, stretch, compress, and reflect parent functions using simple rules instead of re-graphing.

### The Ideas

> **Key Idea 1:** Vertical (outside): $f(x)+k$ up, $f(x)-k$ down, $af(x)$ stretch/compress, $-f(x)$ reflect over $x$-axis.

> **Key Idea 2:** Horizontal (inside): $f(x-h)$ right, $f(x+h)$ left, $f(bx)$ compress by $1/b$, $f(-x)$ reflect over $y$-axis.

**Example:** $g(x) = 2(x-3)^2 + 1$: parent $x^2$, right 3, vertical stretch by 2, up 1.

> ⚠️ **Common trap:** Horizontal shifts are opposite: $f(x-3)$ shifts RIGHT.

### Worked Examples

**Example 1:** $g(x) = -|x+4| - 2$: left 4, reflect over $x$-axis, down 2.

**Example 2:** Start with $\\sqrt{x}$, right 5, stretch by 3: $g(x) = 3\\sqrt{x-5}$.

### Cheat Sheet
- Vertical changes: outside the function, work as expected
- Horizontal changes: inside the function, work opposite
- General: $g(x) = a \\cdot f(b(x-h)) + k$
`,

'm1-fn-3': `## Piecewise Functions

> **Big picture:** Tax brackets, shipping rates, and phone plans use different formulas on different intervals. Piecewise functions model this.

### The Ideas

> **Key Idea 1:** Different formulas apply on different intervals of $x$.

$$f(x) = \\begin{cases} 2x + 1 & \\text{if } x < 3 \\\\ x^2 - 2 & \\text{if } x \\geq 3 \\end{cases}$$

> **Key Idea 2:** Check which interval the input falls in, then use that formula.

**Example:** $f(5) = 25 - 2 = 23$ (since $5 \\geq 3$). $f(1) = 3$ (since $1 < 3$).

> ⚠️ **Common trap:** At the boundary, check the inequality carefully to pick the right piece.

### Worked Examples

**Example 1:** $f(3) = 9 - 2 = 7$ (using $x \\geq 3$ piece).

**Example 2:** $g(x) = \\begin{cases} -x & x \\leq 0 \\\\ x+2 & x > 0 \\end{cases}$. At $x=0$: closed dot at $(0,0)$; at $x = 0^+$: open dot at $(0,2)$.

### Cheat Sheet
- Check interval before evaluating
- Closed circle for $\\leq$/$\\geq$; open for $<$/$>$
- Each input has exactly one output
`,

'm1-av-1': `## Absolute Value Equations

> **Big picture:** $|x|$ measures distance from zero. $|A| = c$ means $A$ is $c$ units from zero in either direction.

### The Ideas

> **Key Idea 1:** $|A| = c$ (where $c > 0$) gives $A = c$ or $A = -c$.

**Example:** $|x-3| = 7$: $x = 10$ or $x = -4$.

> **Key Idea 2:** $|A| = c$ where $c < 0$: no solution. Where $c = 0$: exactly one solution.

> **Key Idea 3:** Isolate the absolute value first.

**Example:** $3|2x+1| - 4 = 11 \\Rightarrow |2x+1| = 5 \\Rightarrow x = 2$ or $x = -3$.

> ⚠️ **Common trap:** Always check for extraneous solutions by substituting back.

### Worked Examples

**Example 1:** $|4x-8| = 0 \\Rightarrow x = 2$. One solution.

**Example 2:** $|2x+3| = |x-1|$. Case 1: $2x+3 = x-1$, $x = -4$. Case 2: $2x+3 = -x+1$, $x = -2/3$. Both check.

### Cheat Sheet
- $|A| = c > 0$: two solutions
- $|A| = 0$: one solution
- $|A| = c < 0$: no solution
- Isolate absolute value first
`,

'm1-av-2': `## Absolute Value Inequalities

> **Big picture:** These describe distance ranges — "within 5 of 3" or "more than 2 from the origin."

### The Ideas

> **Key Idea 1:** $|A| < c$ means $-c < A < c$ (AND, interval).

**Example:** $|x-2| < 5 \\Rightarrow -3 < x < 7$.

> **Key Idea 2:** $|A| > c$ means $A > c$ or $A < -c$ (OR, two rays).

**Example:** $|x+1| > 4 \\Rightarrow x > 3$ or $x < -5$.

> ⚠️ **Common trap:** Less th**AND**, Great**OR** — don't mix them up.

### Worked Examples

**Example 1:** $|3x-6| \\leq 9$: $-9 \\leq 3x-6 \\leq 9$, $-1 \\leq x \\leq 5$.

**Example 2:** $|2x+5| > 1$: $x > -2$ or $x < -3$.

### Cheat Sheet
- $|A| < c$: AND (interval)
- $|A| > c$: OR (two rays)
- Isolate absolute value first
- $|A| < 0$: no solution; $|A| > 0$: all reals except $A = 0$
`,

'm1-ex-1': `## Exponent Rules

> **Big picture:** Exponent rules let you simplify complex expressions. Every rule follows from $a^n = a \\cdot a \\cdots a$ ($n$ times).

### The Ideas

> **Key Idea:** The seven rules:
- Product: $a^m \\cdot a^n = a^{m+n}$
- Quotient: $a^m / a^n = a^{m-n}$
- Power of a Power: $(a^m)^n = a^{mn}$
- Power of a Product: $(ab)^n = a^n b^n$
- Zero: $a^0 = 1$
- Negative: $a^{-n} = 1/a^n$

**Example:** $\\frac{x^5 \\cdot x^{-2}}{x^3} = \\frac{x^3}{x^3} = 1$

> ⚠️ **Common trap:** $(-3)^2 = 9$ but $-3^2 = -9$. Parentheses matter!

### Worked Examples

**Example 1:** $(2x^3y^{-1})^4 = 16x^{12}/y^4$

**Example 2:** $\\frac{(3a^2b)^3}{9a^4b^2} = \\frac{27a^6b^3}{9a^4b^2} = 3a^2b$

### Cheat Sheet
- Same base: add exponents (multiply) or subtract (divide)
- Power of a power: multiply exponents
- Negative exponent: flip to other side of fraction bar
- $a^0 = 1$ (not 0)
`,

'm1-ex-2': `## Scientific Notation

> **Big picture:** Scientific notation handles very large and very small numbers efficiently: $a \\times 10^n$ where $1 \\leq |a| < 10$.

### The Ideas

> **Key Idea 1:** $4{,}500{,}000 = 4.5 \\times 10^6$. $0.00032 = 3.2 \\times 10^{-4}$.

> **Key Idea 2:** Multiply: multiply coefficients, add exponents.
$(3 \\times 10^4)(2 \\times 10^5) = 6 \\times 10^9$

> **Key Idea 3:** Divide: divide coefficients, subtract exponents.

> ⚠️ **Common trap:** If coefficient falls outside $[1, 10)$, adjust: $12 \\times 10^5 = 1.2 \\times 10^6$.

### Worked Examples

**Example 1:** $(5 \\times 10^3)(7 \\times 10^{-2}) = 35 \\times 10^1 = 3.5 \\times 10^2$

**Example 2:** $\\frac{9.6 \\times 10^8}{3.2 \\times 10^5} = 3.0 \\times 10^3$

### Cheat Sheet
- Large numbers: positive exponent
- Small decimals: negative exponent
- Multiply: multiply coefficients, add exponents
- Divide: divide coefficients, subtract exponents
`,

'm1-ex-3': `## Exponential Growth & Decay

> **Big picture:** Populations, investments, radioactive materials follow exponential patterns: $y = a \\cdot b^t$.

### The Ideas

> **Key Idea 1:** $y = a \\cdot b^t$. $a$ = initial value, $b$ = growth/decay factor, $t$ = time.

> **Key Idea 2:** Growth: $b = 1 + r$. Decay: $b = 1 - r$.

**Example:** 1000 bacteria grow at 5%/year: $y = 1000(1.05)^t$. After 10 years: $\\approx 1629$.

> **Key Idea 3:** Half-life: $y = a(1/2)^{t/h}$.

> ⚠️ **Common trap:** "Decreases by 20%" means $b = 0.80$, not $b = 0.20$.

### Worked Examples

**Example 1:** Car worth \\$25,000 depreciates 12%/year. After 5 years: $25000(0.88)^5 \\approx \\$13{,}193$.

**Example 2:** Half-life 6 hr, start 200g, after 18 hr: $200(1/2)^3 = 25$ grams.

### Cheat Sheet
- Growth: $y = a(1+r)^t$
- Decay: $y = a(1-r)^t$
- Half-life: $y = a(1/2)^{t/h}$
- The $y$-intercept is always $a$
`,

'm1-po-1': `## Polynomial Operations

> **Big picture:** Adding, subtracting, and multiplying polynomials are essential building blocks for factoring and equation solving.

### The Ideas

> **Key Idea 1:** Add/subtract: combine like terms.

**Example:** $(3x^2 + 5x - 2) + (x^2 - 3x + 7) = 4x^2 + 2x + 5$

> **Key Idea 2:** Subtract: distribute the negative to ALL terms.

> **Key Idea 3:** Multiply: distribute each term (FOIL for binomials).

**Example:** $(2x+3)(x^2-x+4) = 2x^3 - 2x^2 + 8x + 3x^2 - 3x + 12 = 2x^3 + x^2 + 5x + 12$

> ⚠️ **Common trap:** When subtracting, distribute the negative to EVERY term.

### Worked Examples

**Example 1:** $(5x^3-2x+1) - (3x^3+x^2-4) = 2x^3 - x^2 - 2x + 5$

**Example 2:** $(x+4)(x-4) = x^2 - 16$

### Cheat Sheet
- Like terms: same variable(s), same power(s)
- $(a+b)^2 = a^2 + 2ab + b^2$
- $(a-b)(a+b) = a^2 - b^2$
- Degree of product = sum of degrees
`,

'm1-po-2': `## Factoring Polynomials

> **Big picture:** Factoring reverses multiplication — it breaks polynomials into simpler pieces for solving equations and simplifying.

### The Ideas

> **Key Idea 1:** Always factor out the GCF first. $6x^3 + 9x^2 = 3x^2(2x+3)$

> **Key Idea 2:** Difference of squares: $a^2 - b^2 = (a-b)(a+b)$. Example: $x^2 - 49 = (x-7)(x+7)$.

> **Key Idea 3:** Trinomial ($a=1$): find $p, q$ with $p+q = b$, $pq = c$. $x^2+7x+12 = (x+3)(x+4)$.

> **Key Idea 4:** Trinomial ($a \\neq 1$): AC method / grouping.

**Example:** $2x^2+7x+3$: need numbers multiplying to 6, adding to 7 → 6 and 1. $2x^2+6x+x+3 = 2x(x+3)+1(x+3) = (2x+1)(x+3)$.

> ⚠️ **Common trap:** $x^2 + 9$ does NOT factor over the reals. Sum of squares doesn't factor.

### Worked Examples

**Example 1:** $3x^2-12 = 3(x^2-4) = 3(x-2)(x+2)$

**Example 2:** $x^2-5x-14$: $(-7)(2) = -14$, $-7+2 = -5$. $(x-7)(x+2)$.

### Cheat Sheet
- Step 1: GCF first, always
- Difference of squares: $a^2 - b^2$
- Trinomial: find two numbers (add to $b$, multiply to $c$)
- Check by multiplying factors back out
`,

'm1-sq-1': `## Arithmetic Sequences

> **Big picture:** Arithmetic sequences model constant change — weekly savings, stadium seating, evenly spaced distances.

### The Ideas

> **Key Idea 1:** Common difference $d$: $a_n - a_{n-1} = d$ for all $n$.

> **Key Idea 2:** Explicit formula: $a_n = a_1 + (n-1)d$

> **Key Idea 3:** Recursive formula: $a_n = a_{n-1} + d$, given $a_1$.

**Example:** $4, 7, 10, 13, \\ldots$: $d = 3$, $a_n = 4 + 3(n-1) = 3n + 1$. $a_{50} = 151$.

> ⚠️ **Common trap:** The exponent is $(n-1)$, not $n$, because the first term has zero differences added.

### Worked Examples

**Example 1:** $a_5 = 18$, $a_{12} = 39$. $7d = 21$, $d = 3$, $a_1 = 6$.

**Example 2:** Is 100 in $7, 13, 19, \\ldots$? $a_n = 6n+1 = 100 \\Rightarrow n = 16.5$. No.

### Cheat Sheet
- $d = a_{n+1} - a_n$
- Explicit: $a_n = a_1 + (n-1)d$
- Sum: $S_n = \\frac{n}{2}(a_1 + a_n)$
- Arithmetic sequences are linear in $n$
`,

'm1-sq-2': `## Geometric Sequences

> **Big picture:** Geometric sequences model exponential behavior — compound interest, population growth, radioactive decay.

### The Ideas

> **Key Idea 1:** Common ratio $r$: $a_{n+1}/a_n = r$ for all $n$.

> **Key Idea 2:** Explicit: $a_n = a_1 \\cdot r^{n-1}$

> **Key Idea 3:** Recursive: $a_n = r \\cdot a_{n-1}$, given $a_1$.

**Example:** $5, 15, 45, \\ldots$: $r = 3$. $a_8 = 5 \\cdot 3^7 = 10935$.

> ⚠️ **Common trap:** Exponent is $n-1$, not $n$. The first term uses $r^0 = 1$.

### Worked Examples

**Example 1:** $64, 16, 4, 1, \\ldots$: $r = 1/4$.

**Example 2:** $a_3 = 36$, $a_6 = 972$: $r^3 = 27$, $r = 3$.

### Cheat Sheet
- $r = a_{n+1}/a_n$
- Explicit: $a_n = a_1 \\cdot r^{n-1}$
- $|r| > 1$: grows; $|r| < 1$: shrinks; $r < 0$: alternates sign
`,

'm1-ge-1': `## Angle Relationships

> **Big picture:** Angle relationships let you find unknown angles in complex figures — essential for proofs and construction.

### The Ideas

> **Key Idea 1:** Complementary = $90°$. Supplementary = $180°$. Vertical angles are equal.

> **Key Idea 2:** Parallel lines + transversal:
- Corresponding angles: equal
- Alternate interior: equal
- Alternate exterior: equal
- Co-interior (same-side interior): supplementary

**Example:** One angle is $65°$ with parallel lines → alternate interior = $65°$, co-interior = $115°$.

> ⚠️ **Common trap:** These rules ONLY apply when lines are parallel.

### Worked Examples

**Example 1:** Supplementary angles: $3x+10$ and $2x+20$. $5x+30 = 180$, $x = 30$.

**Example 2:** Co-interior angle to $72°$: $180° - 72° = 108°$.

### Cheat Sheet
- Complementary: sum = $90°$
- Supplementary: sum = $180°$
- Vertical angles: always equal
- Parallel + transversal: corresponding/alternate = equal; co-interior = supplementary
`,

'm1-ge-2': `## Triangle Properties

> **Big picture:** Triangles are the simplest polygon and the basis of all geometry.

### The Ideas

> **Key Idea 1:** Interior angles sum to $180°$.

> **Key Idea 2:** Exterior angle = sum of two remote interior angles.

> **Key Idea 3:** Triangle inequality: sum of any two sides > third side.

> **Key Idea 4:** Congruence: SSS, SAS, ASA, AAS, HL.

> ⚠️ **Common trap:** AAA proves similarity, not congruence. SSA is NOT valid.

### Worked Examples

**Example 1:** Angles $(2x+10)°$, $(3x)°$, $(x+50)°$: $6x+60 = 180$, $x = 20$. Angles: $50°, 60°, 70°$.

**Example 2:** Sides 5 and 11. Third side $s$: $6 < s < 16$.

### Cheat Sheet
- Angle sum = $180°$
- Exterior angle = sum of remote interior angles
- Triangle inequality: $a + b > c$
- Congruence: SSS, SAS, ASA, AAS, HL
`,

'm1-ge-3': `## Coordinate Geometry

> **Big picture:** Coordinate geometry uses algebra to solve geometry problems with precision.

### The Ideas

> **Key Idea 1:** Distance: $d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$

**Example:** $(1,2)$ to $(4,6)$: $d = \\sqrt{9+16} = 5$

> **Key Idea 2:** Midpoint: $M = \\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}\\right)$

> **Key Idea 3:** Parallel: $m_1 = m_2$. Perpendicular: $m_1 \\cdot m_2 = -1$.

> ⚠️ **Common trap:** $\\sqrt{a^2+b^2} \\neq a+b$.

### Worked Examples

**Example 1:** $A(0,0)$, $B(3,4)$, $C(6,0)$: $AB = BC = 5$, $AC = 6$. Isosceles.

**Example 2:** Slope $2/3$ → perpendicular slope = $-3/2$.

### Cheat Sheet
- Distance = Pythagorean theorem
- Midpoint = average coordinates
- Parallel: equal slopes
- Perpendicular: slopes multiply to $-1$
`,

'm1-st-1': `## Measures of Center & Spread

> **Big picture:** Center tells you what's typical; spread tells you how much variability exists.

### The Ideas

> **Key Idea 1:** Mean = sum/count (sensitive to outliers). Median = middle value (resistant). Mode = most frequent.

> **Key Idea 2:** Range = max $-$ min. IQR = $Q_3 - Q_1$. Standard deviation = average distance from mean.

> **Key Idea 3:** Outlier test: beyond $Q_1 - 1.5 \\cdot \\text{IQR}$ or $Q_3 + 1.5 \\cdot \\text{IQR}$.

> ⚠️ **Common trap:** For even-count data, median = average of two middle values.

### Worked Examples

**Example 1:** $10, 12, 14, 14, 18, 20$. Mean $\\approx 14.67$, median $= 14$, mode $= 14$.

**Example 2:** $3, 5, 7, 9, 11, 13, 15$: $Q_1 = 5$, $Q_3 = 13$, IQR $= 8$.

### Cheat Sheet
- Mean: add all, divide by count
- Median: middle value (order first)
- IQR = $Q_3 - Q_1$
- Skewed → use median/IQR; symmetric → use mean/SD
`,

'm1-st-2': `## Data Displays

> **Big picture:** The right graph reveals patterns that numbers alone cannot show.

### The Ideas

> **Key Idea 1:** Histograms: distribution of numerical data (bars for intervals, no gaps).

> **Key Idea 2:** Box plots: five-number summary, great for comparing distributions.

> **Key Idea 3:** Dot plots: individual points on a number line (small data sets).

> **Key Idea 4:** Stem-and-leaf: shows shape and preserves exact values.

> ⚠️ **Common trap:** Histogram bars touch (continuous data). Bar graph bars have gaps (categorical data).

### Worked Examples

**Example 1:** Five-number summary {10, 15, 22, 28, 35}: box from 15 to 28, line at 22, whiskers to 10 and 35.

**Example 2:** Data $23,25,31,34,34,38,42,45$: Stem $2|3\\;5$, $3|1\\;4\\;4\\;8$, $4|2\\;5$.

### Cheat Sheet
- Histogram: numerical, bars touch
- Box plot: 5-number summary
- Shape: symmetric, skewed left/right, uniform
- Compare distributions: use box plots
`,

'm1-st-3': `## Scatter Plots & Correlation

> **Big picture:** Scatter plots show the relationship between two quantitative variables. The correlation coefficient $r$ measures strength and direction.

### The Ideas

> **Key Idea 1:** Look for direction (positive/negative), form (linear/nonlinear), strength (tight/loose).

> **Key Idea 2:** $r$ ranges from $-1$ to $1$. $|r| > 0.8$: strong. $0.5 < |r| < 0.8$: moderate.

> **Key Idea 3:** Line of best fit: $\\hat{y} = mx + b$. Use for predictions.

> **Key Idea 4:** Interpolation (within data range) is reliable; extrapolation (outside) is risky.

> ⚠️ **Common trap:** Correlation does NOT imply causation.

### Worked Examples

**Example 1:** $r = 0.85$: strong positive linear association.

**Example 2:** $\\hat{y} = 2.3x + 10$, predict at $x = 15$: $\\hat{y} = 44.5$.

### Cheat Sheet
- $r$ near $\\pm 1$: strong linear; near 0: weak/none
- Line of best fit: $\\hat{y} = mx + b$
- Interpolation = safe; extrapolation = risky
- Correlation $\\neq$ causation
`,
};

// ============================================================
// PRACTICE PROBLEMS (5 per topic, 150 total)
// 2 easy, 2 medium, 1 hard per topic
// ============================================================
export const PRACTICE: Record<string, LessonProblem[]> = {

// ---- m1-eq-1: Solving Linear Equations ----
'm1-eq-1': [
  {
    question: 'Solve: $2x + 7 = 15$',
    options: ['$x = 4$', '$x = 11$', '$x = 3$', '$x = 8$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Subtract 7 from both sides first.',
    solution: '$2x + 7 = 15$\n$2x = 8$\n$x = 4$\n\nIf you got 11, you added 7 instead of subtracting.',
  },
  {
    question: 'Solve: $5x - 3 = 3x + 9$',
    options: ['$x = 6$', '$x = 3$', '$x = -6$', '$x = 12$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Get all $x$-terms on one side by subtracting $3x$.',
    solution: '$5x - 3 = 3x + 9$\n$2x - 3 = 9$\n$2x = 12$\n$x = 6$',
  },
  {
    question: 'Solve: $3(x - 2) + 4 = 2(x + 3)$',
    options: ['$x = 8$', '$x = 4$', '$x = -8$', '$x = 2$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Distribute the 3 and the 2 first.',
    solution: '$3x - 6 + 4 = 2x + 6$\n$3x - 2 = 2x + 6$\n$x = 8$\n\nIf you got 4, you likely forgot to distribute to both terms.',
  },
  {
    question: 'Solve: $\\frac{x}{3} + \\frac{x}{6} = 5$',
    options: ['$x = 10$', '$x = 15$', '$x = 6$', '$x = 30$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Multiply every term by the LCD (6) to clear fractions.',
    solution: 'LCD = 6. Multiply: $2x + x = 30$\n$3x = 30$\n$x = 10$\n\nIf you got 15, you only multiplied one fraction by 6.',
  },
  {
    question: 'Solve: $\\frac{x+1}{2} - \\frac{x-3}{4} = 2$',
    options: ['$x = 3$', '$x = 5$', '$x = 7$', '$x = 1$'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'Multiply every term by 4 (the LCD of 2 and 4) to clear fractions.',
    solution: 'Multiply by 4: $2(x+1) - (x-3) = 8$\n$2x + 2 - x + 3 = 8$\n$x + 5 = 8$\n$x = 3$\n\nIf you got 5, you may have forgotten to distribute the negative to $-3$.',
  },
],

// ---- m1-eq-2: Solving Linear Inequalities ----
'm1-eq-2': [
  {
    question: 'Solve: $3x + 5 > 20$',
    options: ['$x > 5$', '$x > 15$', '$x < 5$', '$x > 25$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Subtract 5, then divide by 3.',
    solution: '$3x + 5 > 20$\n$3x > 15$\n$x > 5$',
  },
  {
    question: 'Solve: $-2x + 1 \\leq 9$',
    options: ['$x \\geq -4$', '$x \\leq -4$', '$x \\geq 4$', '$x \\leq 4$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'When dividing by a negative number, flip the inequality sign.',
    solution: '$-2x + 1 \\leq 9$\n$-2x \\leq 8$\n$x \\geq -4$ (flip the sign)',
  },
  {
    question: 'Solve: $4(x - 1) < 2x + 10$',
    options: ['$x < 7$', '$x < 3$', '$x > 7$', '$x < 14$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Distribute the 4 first.',
    solution: '$4x - 4 < 2x + 10$\n$2x < 14$\n$x < 7$',
  },
  {
    question: 'Solve the compound inequality: $-3 < 2x + 1 \\leq 11$',
    options: ['$-2 < x \\leq 5$', '$-1 < x \\leq 6$', '$-2 \\leq x < 5$', '$-3 < x \\leq 11$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Subtract 1 from all three parts, then divide by 2.',
    solution: 'Subtract 1: $-4 < 2x \\leq 10$\nDivide by 2: $-2 < x \\leq 5$',
  },
  {
    question: 'Solve: $5 - 3(2x + 1) \\geq -4x + 8$',
    options: ['$x \\leq -3$', '$x \\geq -3$', '$x \\leq 3$', '$x \\geq 3$'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'Distribute $-3$ carefully, then collect $x$-terms.',
    solution: '$5 - 6x - 3 \\geq -4x + 8$\n$2 - 6x \\geq -4x + 8$\n$-2x \\geq 6$\n$x \\leq -3$ (flip sign)',
  },
],

// ---- m1-eq-3: Literal Equations ----
'm1-eq-3': [
  {
    question: 'Solve $d = rt$ for $t$.',
    options: ['$t = \\frac{d}{r}$', '$t = dr$', '$t = d - r$', '$t = \\frac{r}{d}$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Divide both sides by $r$.',
    solution: '$d = rt$\nDivide by $r$: $t = \\frac{d}{r}$',
  },
  {
    question: 'Solve $P = 2l + 2w$ for $w$.',
    options: ['$w = \\frac{P - 2l}{2}$', '$w = \\frac{P}{2} - l$', '$w = P - 2l$', '$w = \\frac{P - l}{2}$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Subtract $2l$ first, then divide by 2.',
    solution: '$P - 2l = 2w$\n$w = \\frac{P - 2l}{2}$\n\nNote: option B, $\\frac{P}{2} - l$, is equivalent and also correct.',
  },
  {
    question: 'Solve $V = \\frac{1}{3}\\pi r^2 h$ for $h$.',
    options: ['$h = \\frac{3V}{\\pi r^2}$', '$h = \\frac{V}{3\\pi r^2}$', '$h = 3V\\pi r^2$', '$h = \\frac{V\\pi r^2}{3}$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Multiply both sides by 3, then divide by $\\pi r^2$.',
    solution: '$3V = \\pi r^2 h$\n$h = \\frac{3V}{\\pi r^2}$\n\nIf you got option B, you multiplied by $\\frac{1}{3}$ instead of 3.',
  },
  {
    question: 'Solve $ax + bx = c$ for $x$.',
    options: ['$x = \\frac{c}{a + b}$', '$x = \\frac{c - b}{a}$', '$x = c - a - b$', '$x = \\frac{c}{ab}$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Factor $x$ out of the left side.',
    solution: '$x(a + b) = c$\n$x = \\frac{c}{a + b}$\n\nThe key step is factoring out $x$.',
  },
  {
    question: 'Solve $\\frac{a}{x} + \\frac{b}{x} = c$ for $x$.',
    options: ['$x = \\frac{a + b}{c}$', '$x = \\frac{c}{a + b}$', '$x = \\frac{ab}{c}$', '$x = c(a + b)$'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'Combine the fractions on the left side first.',
    solution: '$\\frac{a + b}{x} = c$\nMultiply by $x$: $a + b = cx$\n$x = \\frac{a + b}{c}$',
  },
],

// ---- m1-tv-1: Slope & Rate of Change ----
'm1-tv-1': [
  {
    question: 'Find the slope between $(2, 3)$ and $(6, 11)$.',
    options: ['$2$', '$4$', '$\\frac{1}{2}$', '$8$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Use $m = \\frac{y_2 - y_1}{x_2 - x_1}$.',
    solution: '$m = \\frac{11 - 3}{6 - 2} = \\frac{8}{4} = 2$',
  },
  {
    question: 'What is the slope of a horizontal line?',
    options: ['$0$', 'Undefined', '$1$', '$-1$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'A horizontal line has no rise.',
    solution: 'Horizontal lines have $\\Delta y = 0$, so $m = \\frac{0}{\\Delta x} = 0$.\n\nVertical lines have undefined slope (division by zero).',
  },
  {
    question: 'Find the slope between $(-3, 7)$ and $(5, -1)$.',
    options: ['$-1$', '$1$', '$-\\frac{3}{4}$', '$\\frac{3}{4}$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Be careful with negative signs in the subtraction.',
    solution: '$m = \\frac{-1 - 7}{5 - (-3)} = \\frac{-8}{8} = -1$',
  },
  {
    question: 'A line passes through $(1, k)$ and $(4, 10)$ with slope 2. Find $k$.',
    options: ['$k = 4$', '$k = 6$', '$k = 8$', '$k = 2$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Plug into $m = \\frac{y_2 - y_1}{x_2 - x_1}$ and solve for $k$.',
    solution: '$2 = \\frac{10 - k}{4 - 1} = \\frac{10 - k}{3}$\n$6 = 10 - k$\n$k = 4$',
  },
  {
    question: 'Line $\\ell_1$ has slope $\\frac{3}{5}$. What is the slope of a line perpendicular to $\\ell_1$?',
    options: ['$-\\frac{5}{3}$', '$\\frac{5}{3}$', '$-\\frac{3}{5}$', '$\\frac{3}{5}$'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'Perpendicular slopes are negative reciprocals: $m_1 \\cdot m_2 = -1$.',
    solution: 'Perpendicular slope $= -\\frac{1}{m} = -\\frac{1}{3/5} = -\\frac{5}{3}$\n\nCheck: $\\frac{3}{5} \\cdot (-\\frac{5}{3}) = -1$ ✓',
  },
],

// ---- m1-tv-2: Forms of Linear Equations ----
'm1-tv-2': [
  {
    question: 'What is the slope of $y = -3x + 7$?',
    options: ['$-3$', '$7$', '$3$', '$-7$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'In $y = mx + b$, the slope is $m$.',
    solution: 'In slope-intercept form $y = mx + b$, $m = -3$ is the slope and $b = 7$ is the $y$-intercept.',
  },
  {
    question: 'Write the equation of a line through $(0, 5)$ with slope $2$ in slope-intercept form.',
    options: ['$y = 2x + 5$', '$y = 5x + 2$', '$y = 2x - 5$', '$y = -2x + 5$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'The point $(0, 5)$ tells you the $y$-intercept directly.',
    solution: '$m = 2$, $b = 5$ (since the point is on the $y$-axis). So $y = 2x + 5$.',
  },
  {
    question: 'Convert $3x + 2y = 12$ to slope-intercept form.',
    options: ['$y = -\\frac{3}{2}x + 6$', '$y = \\frac{3}{2}x + 6$', '$y = -3x + 12$', '$y = -\\frac{3}{2}x + 12$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Isolate $y$: subtract $3x$, then divide by 2.',
    solution: '$2y = -3x + 12$\n$y = -\\frac{3}{2}x + 6$',
  },
  {
    question: 'Write the equation through $(3, 1)$ and $(5, 7)$ in slope-intercept form.',
    options: ['$y = 3x - 8$', '$y = 3x + 1$', '$y = \\frac{1}{3}x - 8$', '$y = 3x + 8$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Find slope first, then use point-slope form.',
    solution: '$m = \\frac{7-1}{5-3} = 3$. Point-slope: $y - 1 = 3(x - 3)$, $y = 3x - 9 + 1 = 3x - 8$.',
  },
  {
    question: 'Write in standard form: a line with slope $\\frac{2}{3}$ through $(6, 1)$.',
    options: ['$2x - 3y = 9$', '$3x - 2y = 9$', '$2x + 3y = 9$', '$2x - 3y = -9$'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'Start with point-slope form, then rearrange to $Ax + By = C$ with integer coefficients.',
    solution: '$y - 1 = \\frac{2}{3}(x - 6)$\n$y - 1 = \\frac{2}{3}x - 4$\n$y = \\frac{2}{3}x - 3$\nMultiply by 3: $3y = 2x - 9$\n$2x - 3y = 9$',
  },
],

// ---- m1-tv-3: Systems of Equations ----
'm1-tv-3': [
  {
    question: 'Solve: $y = x + 3$ and $y = 2x + 1$. Find $x$.',
    options: ['$x = 2$', '$x = 3$', '$x = 1$', '$x = 4$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Set the two expressions for $y$ equal to each other.',
    solution: '$x + 3 = 2x + 1$\n$3 - 1 = 2x - x$\n$x = 2$. Then $y = 5$.',
  },
  {
    question: 'Solve: $x + y = 10$ and $x - y = 4$. Find $x$.',
    options: ['$x = 7$', '$x = 3$', '$x = 6$', '$x = 8$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Add the two equations to eliminate $y$.',
    solution: 'Add: $2x = 14$, $x = 7$. Then $y = 3$.',
  },
  {
    question: 'Solve: $2x + 3y = 19$ and $x = y + 3$. Find $y$.',
    options: ['$y = \\frac{13}{5}$', '$y = 3$', '$y = 2$', '$y = 5$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Substitute $x = y + 3$ into the first equation.',
    solution: '$2(y+3) + 3y = 19$\n$2y + 6 + 3y = 19$\n$5y = 13$\n$y = \\frac{13}{5}$',
  },
  {
    question: 'Solve: $3x - 2y = 7$ and $x + 2y = 5$. What is $x$?',
    options: ['$x = 3$', '$x = 2$', '$x = 4$', '$x = 1$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Add the equations to eliminate $y$.',
    solution: 'Add: $4x = 12$, $x = 3$. Then $3(3)-2y=7$, $9-2y=7$, $y=1$.',
  },
  {
    question: 'Solve: $4x + 3y = 10$ and $2x + y = 4$. Find $x + y$.',
    options: ['$x + y = 3$', '$x + y = 4$', '$x + y = 2$', '$x + y = 5$'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'From the second equation, solve for $y$, then substitute into the first.',
    solution: 'From $2x + y = 4$: $y = 4 - 2x$.\nSubstitute: $4x + 3(4-2x) = 10$\n$4x + 12 - 6x = 10$\n$-2x = -2$, $x = 1$.\n$y = 4 - 2(1) = 2$.\n$x + y = 1 + 2 = 3$.',
  },
],

// ---- m1-tv-4: Systems of Inequalities ----
'm1-tv-4': [
  {
    question: 'Is the point $(1, 2)$ a solution to $y \\leq 3x + 1$?',
    options: ['Yes', 'No', 'Only if $x > 0$', 'Cannot determine'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Substitute $x = 1$ and $y = 2$ into the inequality.',
    solution: '$2 \\leq 3(1) + 1 = 4$? Yes, $2 \\leq 4$ is true.',
  },
  {
    question: 'For the inequality $y > x - 3$, which boundary line type is used?',
    options: ['Dashed line', 'Solid line', 'Dotted line', 'No line'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Strict inequality ($>$ or $<$) uses a dashed line.',
    solution: 'Since the inequality is strict ($>$, not $\\geq$), the boundary is a dashed line. Points on the line are NOT included.',
  },
  {
    question: 'Is $(3, 1)$ in the solution set of $y \\leq x + 2$ AND $y \\geq -x + 1$?',
    options: ['Yes', 'No — fails first', 'No — fails second', 'No — fails both'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Check each inequality separately.',
    solution: '$1 \\leq 3 + 2 = 5$? Yes.\n$1 \\geq -3 + 1 = -2$? Yes.\nBoth satisfied, so $(3,1)$ is in the solution set.',
  },
  {
    question: 'Which point is in the solution set of $y < 2x$ AND $y > -x + 6$?',
    options: ['$(4, 5)$', '$(1, 1)$', '$(2, 3)$', '$(3, 2)$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Test each point in both inequalities.',
    solution: '$(4,5)$: $5 < 8$? Yes. $5 > -4+6 = 2$? Yes. ✓\n$(1,1)$: $1 < 2$? Yes. $1 > 5$? No. ✗\n$(2,3)$: $3 < 4$? Yes. $3 > 4$? No. ✗\n$(3,2)$: $2 < 6$? Yes. $2 > 3$? No. ✗',
  },
  {
    question: 'Write a system of inequalities: "A store sells at least 20 items total. Shirts ($x$) cost \\$15 and pants ($y$) cost \\$25. Revenue must exceed \\$400."',
    options: ['$x + y \\geq 20$ and $15x + 25y > 400$', '$x + y > 20$ and $15x + 25y \\geq 400$', '$x + y \\leq 20$ and $15x + 25y > 400$', '$x + y \\geq 20$ and $15x + 25y < 400$'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: '"At least 20" means $\\geq 20$. "Exceeds \\$400" means $> 400$.',
    solution: '"At least 20 items": $x + y \\geq 20$.\n"Revenue exceeds \\$400": $15x + 25y > 400$.',
  },
],

// ---- m1-un-1: Unit Conversions ----
'm1-un-1': [
  {
    question: 'Convert 3 miles to feet. (1 mile = 5280 ft)',
    options: ['$15{,}840$ ft', '$1{,}760$ ft', '$5{,}283$ ft', '$10{,}560$ ft'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Multiply 3 by 5280.',
    solution: '$3 \\times 5280 = 15{,}840$ ft.',
  },
  {
    question: 'Convert 7200 seconds to hours.',
    options: ['$2$ hours', '$1.5$ hours', '$3$ hours', '$120$ hours'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Divide by 3600 (seconds per hour).',
    solution: '$7200 \\div 3600 = 2$ hours.',
  },
  {
    question: 'Convert 60 mph to feet per second. (1 mi = 5280 ft, 1 hr = 3600 s)',
    options: ['$88$ ft/s', '$60$ ft/s', '$44$ ft/s', '$132$ ft/s'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Multiply by $\\frac{5280}{3600}$.',
    solution: '$60 \\times \\frac{5280}{3600} = 60 \\times \\frac{22}{15} = 88$ ft/s.',
  },
  {
    question: 'Convert $2.5$ square meters to square centimeters. (1 m = 100 cm)',
    options: ['$25{,}000$ cm$^2$', '$250$ cm$^2$', '$2{,}500$ cm$^2$', '$250{,}000$ cm$^2$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'For area, square the conversion factor: $(100)^2 = 10{,}000$.',
    solution: '$2.5 \\text{ m}^2 \\times 10{,}000 \\frac{\\text{cm}^2}{\\text{m}^2} = 25{,}000$ cm$^2$.',
  },
  {
    question: 'A flow rate is 5 liters per minute. Convert to cubic centimeters per second. (1 L = 1000 cm$^3$, 1 min = 60 s)',
    options: ['$83.\\overline{3}$ cm$^3$/s', '$5000$ cm$^3$/s', '$300$ cm$^3$/s', '$0.083$ cm$^3$/s'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'Convert liters to cm$^3$ (multiply by 1000), then minutes to seconds (divide by 60).',
    solution: '$5 \\frac{\\text{L}}{\\text{min}} \\times \\frac{1000 \\text{ cm}^3}{1 \\text{ L}} \\times \\frac{1 \\text{ min}}{60 \\text{ s}} = \\frac{5000}{60} = 83.\\overline{3}$ cm$^3$/s.',
  },
],

// ---- m1-un-2: Direct & Inverse Variation ----
'm1-un-2': [
  {
    question: '$y$ varies directly with $x$. If $y = 8$ when $x = 2$, find $y$ when $x = 5$.',
    options: ['$y = 20$', '$y = 10$', '$y = 16$', '$y = 40$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Find $k = y/x$, then use $y = kx$.',
    solution: '$k = 8/2 = 4$. $y = 4(5) = 20$.',
  },
  {
    question: '$y$ varies inversely with $x$. If $y = 12$ when $x = 3$, find $y$ when $x = 6$.',
    options: ['$y = 6$', '$y = 24$', '$y = 4$', '$y = 36$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Find $k = xy$, then use $y = k/x$.',
    solution: '$k = 12 \\times 3 = 36$. $y = 36/6 = 6$.',
  },
  {
    question: 'The cost $C$ varies directly with weight $w$. If 4 kg costs \\$14, how much does 10 kg cost?',
    options: ['$\\$35$', '$\\$28$', '$\\$56$', '$\\$40$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Find the unit rate $k = C/w$.',
    solution: '$k = 14/4 = 3.50$. $C = 3.50 \\times 10 = \\$35$.',
  },
  {
    question: 'The time $t$ to paint a fence varies inversely with the number of workers $n$. With 4 workers it takes 6 hours. How long with 8 workers?',
    options: ['$3$ hours', '$12$ hours', '$2$ hours', '$48$ hours'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Inverse variation: $k = nt$.',
    solution: '$k = 4 \\times 6 = 24$. $t = 24/8 = 3$ hours.',
  },
  {
    question: 'If $y$ varies directly with $x^2$ and $y = 50$ when $x = 5$, find $y$ when $x = 3$.',
    options: ['$y = 18$', '$y = 30$', '$y = 10$', '$y = 45$'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'This is $y = kx^2$. Find $k$ first.',
    solution: '$y = kx^2$. $50 = k(25)$, $k = 2$. $y = 2(9) = 18$.',
  },
],

// ---- m1-rr-1: Simplifying Radicals ----
'm1-rr-1': [
  {
    question: 'Simplify $\\sqrt{36}$.',
    options: ['$6$', '$18$', '$\\sqrt{6}$', '$4$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: '$36$ is a perfect square.',
    solution: '$\\sqrt{36} = 6$ because $6^2 = 36$.',
  },
  {
    question: 'Simplify $\\sqrt{50}$.',
    options: ['$5\\sqrt{2}$', '$2\\sqrt{5}$', '$10\\sqrt{5}$', '$25\\sqrt{2}$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Find the largest perfect square factor of 50.',
    solution: '$\\sqrt{50} = \\sqrt{25 \\cdot 2} = 5\\sqrt{2}$.',
  },
  {
    question: 'Simplify $\\sqrt{128}$.',
    options: ['$8\\sqrt{2}$', '$4\\sqrt{8}$', '$2\\sqrt{32}$', '$16\\sqrt{2}$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: '$128 = 64 \\times 2$.',
    solution: '$\\sqrt{128} = \\sqrt{64 \\cdot 2} = 8\\sqrt{2}$.\n\nNote: $4\\sqrt{8}$ is equivalent but not fully simplified since $\\sqrt{8} = 2\\sqrt{2}$.',
  },
  {
    question: 'Simplify $2\\sqrt{75}$.',
    options: ['$10\\sqrt{3}$', '$6\\sqrt{5}$', '$5\\sqrt{12}$', '$15\\sqrt{2}$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: '$75 = 25 \\times 3$.',
    solution: '$2\\sqrt{75} = 2\\sqrt{25 \\cdot 3} = 2 \\cdot 5\\sqrt{3} = 10\\sqrt{3}$.',
  },
  {
    question: 'Simplify $\\sqrt[3]{250}$.',
    options: ['$5\\sqrt[3]{2}$', '$2\\sqrt[3]{5}$', '$10\\sqrt[3]{25}$', '$25\\sqrt[3]{10}$'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'Find the largest perfect cube factor of 250. $250 = 125 \\times 2$.',
    solution: '$\\sqrt[3]{250} = \\sqrt[3]{125 \\cdot 2} = 5\\sqrt[3]{2}$.',
  },
],

// ---- m1-rr-2: Operations with Radicals ----
'm1-rr-2': [
  {
    question: 'Simplify $3\\sqrt{7} + 5\\sqrt{7}$.',
    options: ['$8\\sqrt{7}$', '$15\\sqrt{7}$', '$8\\sqrt{14}$', '$\\sqrt{56}$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'These are like radicals — add the coefficients.',
    solution: '$3\\sqrt{7} + 5\\sqrt{7} = (3+5)\\sqrt{7} = 8\\sqrt{7}$.',
  },
  {
    question: 'Simplify $\\sqrt{5} \\cdot \\sqrt{20}$.',
    options: ['$10$', '$5\\sqrt{4}$', '$\\sqrt{100}$', '$4\\sqrt{5}$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: '$\\sqrt{a} \\cdot \\sqrt{b} = \\sqrt{ab}$.',
    solution: '$\\sqrt{5} \\cdot \\sqrt{20} = \\sqrt{100} = 10$.',
  },
  {
    question: 'Simplify $\\sqrt{48} - \\sqrt{27}$.',
    options: ['$\\sqrt{3}$', '$\\sqrt{21}$', '$3\\sqrt{3}$', '$7\\sqrt{3}$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Simplify each radical first to get like radicals.',
    solution: '$\\sqrt{48} = 4\\sqrt{3}$ and $\\sqrt{27} = 3\\sqrt{3}$.\n$4\\sqrt{3} - 3\\sqrt{3} = \\sqrt{3}$.',
  },
  {
    question: 'Rationalize: $\\frac{6}{\\sqrt{3}}$.',
    options: ['$2\\sqrt{3}$', '$\\frac{6\\sqrt{3}}{9}$', '$\\frac{\\sqrt{3}}{6}$', '$6\\sqrt{3}$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Multiply numerator and denominator by $\\sqrt{3}$.',
    solution: '$\\frac{6}{\\sqrt{3}} \\cdot \\frac{\\sqrt{3}}{\\sqrt{3}} = \\frac{6\\sqrt{3}}{3} = 2\\sqrt{3}$.',
  },
  {
    question: 'Rationalize: $\\frac{4}{2 + \\sqrt{3}}$.',
    options: ['$8 - 4\\sqrt{3}$', '$\\frac{4}{2 + \\sqrt{3}}$', '$8 + 4\\sqrt{3}$', '$4 - 2\\sqrt{3}$'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'Multiply by the conjugate: $\\frac{2 - \\sqrt{3}}{2 - \\sqrt{3}}$.',
    solution: '$\\frac{4(2-\\sqrt{3})}{(2+\\sqrt{3})(2-\\sqrt{3})} = \\frac{4(2-\\sqrt{3})}{4-3} = \\frac{4(2-\\sqrt{3})}{1} = 8-4\\sqrt{3}$.',
  },
],

// ---- m1-rr-3: Rational Expressions Intro ----
'm1-rr-3': [
  {
    question: 'Simplify $\\frac{6x}{3x^2}$.',
    options: ['$\\frac{2}{x}$', '$2x$', '$\\frac{3}{x}$', '$\\frac{x}{2}$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Cancel common factors from the numerator and denominator.',
    solution: '$\\frac{6x}{3x^2} = \\frac{6}{3x} = \\frac{2}{x}$ (where $x \\neq 0$).',
  },
  {
    question: 'What value of $x$ must be excluded from $\\frac{5}{x - 4}$?',
    options: ['$x = 4$', '$x = -4$', '$x = 0$', '$x = 5$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Set the denominator equal to zero.',
    solution: '$x - 4 = 0$ gives $x = 4$. This value makes the denominator zero, so $x \\neq 4$.',
  },
  {
    question: 'Simplify $\\frac{x^2 - 16}{x + 4}$.',
    options: ['$x - 4$', '$x + 4$', '$\\frac{x-4}{x+4}$', '$x^2 - 4$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Factor the numerator as a difference of squares.',
    solution: '$\\frac{(x-4)(x+4)}{x+4} = x - 4$ (where $x \\neq -4$).',
  },
  {
    question: 'Simplify $\\frac{x^2 + 3x - 10}{x^2 - 4}$.',
    options: ['$\\frac{x+5}{x+2}$', '$\\frac{x-5}{x+2}$', '$\\frac{x+5}{x-2}$', '$\\frac{x-2}{x+5}$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Factor both: numerator = $(x+5)(x-2)$, denominator = $(x-2)(x+2)$.',
    solution: '$\\frac{(x+5)(x-2)}{(x-2)(x+2)} = \\frac{x+5}{x+2}$ (where $x \\neq 2$).',
  },
  {
    question: 'Simplify $\\frac{2x^2 - 5x - 3}{2x^2 + 7x + 3}$.',
    options: ['$\\frac{x - 3}{x + 3}$', '$\\frac{2x + 1}{2x - 1}$', '$\\frac{x + 3}{x - 3}$', '$\\frac{2x - 3}{2x + 3}$'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'Factor both trinomials using the AC method.',
    solution: 'Numerator: $2x^2-5x-3 = (2x+1)(x-3)$. Check: $2x^2-6x+x-3 = 2x^2-5x-3$ ✓\nDenominator: $2x^2+7x+3 = (2x+1)(x+3)$. Check: $2x^2+6x+x+3 = 2x^2+7x+3$ ✓\n$\\frac{(2x+1)(x-3)}{(2x+1)(x+3)} = \\frac{x-3}{x+3}$ (where $x \\neq -\\frac{1}{2}$).',
  },
],

// ---- m1-fn-1: Function Notation & Evaluation ----
'm1-fn-1': [
  {
    question: 'If $f(x) = 2x + 3$, find $f(4)$.',
    options: ['$11$', '$8$', '$14$', '$7$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Replace $x$ with 4.',
    solution: '$f(4) = 2(4) + 3 = 8 + 3 = 11$.',
  },
  {
    question: 'If $g(x) = x^2 - 1$, find $g(-3)$.',
    options: ['$8$', '$-10$', '$10$', '$-8$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Substitute $-3$ for $x$ and remember $(-3)^2 = 9$.',
    solution: '$g(-3) = (-3)^2 - 1 = 9 - 1 = 8$.',
  },
  {
    question: 'If $f(x) = 3x - 5$, find $f(2a)$.',
    options: ['$6a - 5$', '$6a - 10$', '$3a - 5$', '$2a - 5$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Replace every $x$ with $2a$.',
    solution: '$f(2a) = 3(2a) - 5 = 6a - 5$.',
  },
  {
    question: 'What is the domain of $f(x) = \\frac{1}{x - 5}$?',
    options: ['All reals except $x = 5$', 'All reals', 'All reals except $x = 0$', '$x > 5$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Find where the denominator equals zero.',
    solution: '$x - 5 = 0$ when $x = 5$. Division by zero is undefined, so domain is all reals except $x = 5$.',
  },
  {
    question: 'If $f(x) = x^2 + 2x$, find $f(a+1) - f(a)$.',
    options: ['$2a + 3$', '$a^2 + 2a + 1$', '$2a + 1$', '$a + 3$'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'Compute $f(a+1)$ and $f(a)$ separately, then subtract.',
    solution: '$f(a+1) = (a+1)^2 + 2(a+1) = a^2+2a+1+2a+2 = a^2+4a+3$\n$f(a) = a^2 + 2a$\n$f(a+1)-f(a) = (a^2+4a+3)-(a^2+2a) = 2a + 3$.',
  },
],

// ---- m1-fn-2: Function Transformations ----
'm1-fn-2': [
  {
    question: 'The graph of $f(x) = x^2$ is shifted up 5 units. What is the new function?',
    options: ['$g(x) = x^2 + 5$', '$g(x) = (x+5)^2$', '$g(x) = x^2 - 5$', '$g(x) = 5x^2$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Adding a constant outside the function shifts up.',
    solution: 'Shifting up 5 adds 5 to the output: $g(x) = x^2 + 5$.',
  },
  {
    question: 'What transformation takes $f(x) = |x|$ to $g(x) = |x - 4|$?',
    options: ['Shift right 4', 'Shift left 4', 'Shift up 4', 'Shift down 4'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Inside the function, $x - 4$ means shift in the opposite direction.',
    solution: '$f(x-4) = |x-4|$ shifts the graph right 4 units.',
  },
  {
    question: 'Describe the transformation: $g(x) = -2f(x)$.',
    options: ['Vertical stretch by 2 and reflect over $x$-axis', 'Horizontal compress by 2 and reflect over $y$-axis', 'Vertical stretch by 2 only', 'Shift down 2 and reflect'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'The $-$ reflects over the $x$-axis; the 2 stretches vertically.',
    solution: 'The negative sign reflects over the $x$-axis. The factor of 2 stretches vertically by 2.',
  },
  {
    question: 'Write the function: $f(x) = x^2$ shifted left 3 and down 7.',
    options: ['$g(x) = (x+3)^2 - 7$', '$g(x) = (x-3)^2 - 7$', '$g(x) = (x+3)^2 + 7$', '$g(x) = (x-7)^2 + 3$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Left 3: replace $x$ with $x+3$. Down 7: subtract 7.',
    solution: 'Left 3: $(x+3)^2$. Down 7: $(x+3)^2 - 7$.',
  },
  {
    question: 'Given $f(x) = \\sqrt{x}$, write $g(x)$ after: reflect over $x$-axis, right 2, up 6.',
    options: ['$g(x) = -\\sqrt{x-2} + 6$', '$g(x) = \\sqrt{-(x-2)} + 6$', '$g(x) = -\\sqrt{x+2} + 6$', '$g(x) = -\\sqrt{x-2} - 6$'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'Apply transformations: negate for reflection, $x-2$ for right shift, $+6$ for up.',
    solution: 'Reflect: $-\\sqrt{x}$. Right 2: $-\\sqrt{x-2}$. Up 6: $-\\sqrt{x-2}+6$.',
  },
],

// ---- m1-fn-3: Piecewise Functions ----
'm1-fn-3': [
  {
    question: 'Given $f(x) = \\begin{cases} x+1 & x < 2 \\\\ 2x-1 & x \\geq 2 \\end{cases}$, find $f(2)$.',
    options: ['$3$', '$2$', '$1$', '$5$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Since $2 \\geq 2$, use the second piece.',
    solution: '$x = 2 \\geq 2$, so use $2x - 1$: $f(2) = 2(2)-1 = 3$.',
  },
  {
    question: 'Given $f(x) = \\begin{cases} 3x & x < 0 \\\\ x^2 & x \\geq 0 \\end{cases}$, find $f(-2)$.',
    options: ['$-6$', '$4$', '$6$', '$-4$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Since $-2 < 0$, use the first piece.',
    solution: '$x = -2 < 0$, so use $3x$: $f(-2) = 3(-2) = -6$.',
  },
  {
    question: 'Given $f(x) = \\begin{cases} x + 5 & x \\leq 1 \\\\ 2x + 1 & x > 1 \\end{cases}$, find $f(1) + f(3)$.',
    options: ['$13$', '$14$', '$12$', '$10$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: '$f(1)$ uses the first piece ($1 \\leq 1$). $f(3)$ uses the second.',
    solution: '$f(1) = 1 + 5 = 6$ (since $1 \\leq 1$).\n$f(3) = 2(3)+1 = 7$ (since $3 > 1$).\n$f(1)+f(3) = 13$.',
  },
  {
    question: 'For $f(x) = \\begin{cases} -x & x < 0 \\\\ x^2 & 0 \\leq x < 3 \\\\ 10 & x \\geq 3 \\end{cases}$, find $f(-1) + f(2) + f(5)$.',
    options: ['$15$', '$14$', '$13$', '$16$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Evaluate each: $f(-1)$ uses first piece, $f(2)$ uses second, $f(5)$ uses third.',
    solution: '$f(-1) = -(-1) = 1$\n$f(2) = 2^2 = 4$\n$f(5) = 10$\n$1 + 4 + 10 = 15$.',
  },
  {
    question: 'Find the value of $a$ so that $f(x) = \\begin{cases} 2x + a & x \\leq 3 \\\\ x^2 - 1 & x > 3 \\end{cases}$ is continuous at $x = 3$.',
    options: ['$a = 2$', '$a = 8$', '$a = -2$', '$a = 0$'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'For continuity, the two pieces must give the same value at $x = 3$.',
    solution: 'Left piece at $x = 3$: $2(3)+a = 6+a$.\nRight piece at $x = 3$: $9-1 = 8$.\nSet equal: $6+a = 8$, so $a = 2$.',
  },
],

// ---- m1-av-1: Absolute Value Equations ----
'm1-av-1': [
  {
    question: 'Solve: $|x| = 7$',
    options: ['$x = 7$ or $x = -7$', '$x = 7$', '$x = -7$', '$x = 49$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'The absolute value equals 7 means $x$ is 7 units from zero.',
    solution: '$|x| = 7$ means $x = 7$ or $x = -7$.',
  },
  {
    question: 'Solve: $|x + 3| = 5$',
    options: ['$x = 2$ or $x = -8$', '$x = 2$ or $x = 8$', '$x = -2$ or $x = -8$', '$x = 8$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Set $x + 3 = 5$ and $x + 3 = -5$.',
    solution: '$x + 3 = 5 \\Rightarrow x = 2$.\n$x + 3 = -5 \\Rightarrow x = -8$.',
  },
  {
    question: 'Solve: $|3x - 6| = 12$',
    options: ['$x = 6$ or $x = -2$', '$x = 6$ or $x = 2$', '$x = -6$ or $x = 2$', '$x = 4$ or $x = -4$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Split into $3x - 6 = 12$ and $3x - 6 = -12$.',
    solution: '$3x - 6 = 12 \\Rightarrow 3x = 18 \\Rightarrow x = 6$.\n$3x - 6 = -12 \\Rightarrow 3x = -6 \\Rightarrow x = -2$.',
  },
  {
    question: 'Solve: $2|x - 4| + 3 = 11$',
    options: ['$x = 8$ or $x = 0$', '$x = 8$ or $x = -8$', '$x = 0$ or $x = 4$', '$x = 8$ only'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Isolate the absolute value first: subtract 3, divide by 2.',
    solution: '$2|x-4| = 8 \\Rightarrow |x-4| = 4$.\n$x - 4 = 4 \\Rightarrow x = 8$.\n$x - 4 = -4 \\Rightarrow x = 0$.',
  },
  {
    question: 'Solve: $|2x + 1| = |x - 5|$',
    options: ['$x = -6$ or $x = \\frac{4}{3}$', '$x = 6$ or $x = -\\frac{4}{3}$', '$x = -6$ only', '$x = 4$ or $x = -5$'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'Set up two cases: $2x+1 = x-5$ and $2x+1 = -(x-5)$.',
    solution: 'Case 1: $2x+1 = x-5 \\Rightarrow x = -6$.\nCase 2: $2x+1 = -x+5 \\Rightarrow 3x = 4 \\Rightarrow x = \\frac{4}{3}$.\nCheck $x=-6$: $|-11| = |-11|$ ✓. Check $x=4/3$: $|11/3| = |-11/3|$ ✓.',
  },
],

// ---- m1-av-2: Absolute Value Inequalities ----
'm1-av-2': [
  {
    question: 'Solve: $|x| < 5$',
    options: ['$-5 < x < 5$', '$x < 5$', '$x > -5$', '$x < -5$ or $x > 5$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: '"Less than" gives an interval.',
    solution: '$|x| < 5$ means $-5 < x < 5$.',
  },
  {
    question: 'Solve: $|x| > 3$',
    options: ['$x > 3$ or $x < -3$', '$-3 < x < 3$', '$x > 3$', '$x < -3$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: '"Greater than" gives two rays.',
    solution: '$|x| > 3$ means $x > 3$ or $x < -3$.',
  },
  {
    question: 'Solve: $|2x - 4| \\leq 6$',
    options: ['$-1 \\leq x \\leq 5$', '$-5 \\leq x \\leq 1$', '$x \\leq 5$', '$-1 < x < 5$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Write as $-6 \\leq 2x - 4 \\leq 6$ and solve.',
    solution: '$-6 \\leq 2x - 4 \\leq 6$\n$-2 \\leq 2x \\leq 10$\n$-1 \\leq x \\leq 5$.',
  },
  {
    question: 'Solve: $|x + 2| > 4$',
    options: ['$x > 2$ or $x < -6$', '$-6 < x < 2$', '$x > 6$ or $x < -2$', '$x > 4$ or $x < -4$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: '"Greater than" means OR: $x + 2 > 4$ or $x + 2 < -4$.',
    solution: '$x + 2 > 4 \\Rightarrow x > 2$.\n$x + 2 < -4 \\Rightarrow x < -6$.\nSolution: $x > 2$ or $x < -6$.',
  },
  {
    question: 'Solve: $3|x - 1| - 2 > 7$',
    options: ['$x > 4$ or $x < -2$', '$-2 < x < 4$', '$x > 4$', '$x < -2$'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'Isolate: $3|x-1| > 9$, then $|x-1| > 3$.',
    solution: '$3|x-1| > 9 \\Rightarrow |x-1| > 3$.\n$x - 1 > 3 \\Rightarrow x > 4$.\n$x - 1 < -3 \\Rightarrow x < -2$.\nSolution: $x > 4$ or $x < -2$.',
  },
],

// ---- m1-ex-1: Exponent Rules ----
'm1-ex-1': [
  {
    question: 'Simplify $x^3 \\cdot x^5$.',
    options: ['$x^8$', '$x^{15}$', '$2x^8$', '$x^2$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'When multiplying same bases, add the exponents.',
    solution: '$x^3 \\cdot x^5 = x^{3+5} = x^8$.',
  },
  {
    question: 'Simplify $\\frac{y^7}{y^3}$.',
    options: ['$y^4$', '$y^{10}$', '$y^{21}$', '$y^{7/3}$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'When dividing same bases, subtract the exponents.',
    solution: '$\\frac{y^7}{y^3} = y^{7-3} = y^4$.',
  },
  {
    question: 'Simplify $(3x^2)^3$.',
    options: ['$27x^6$', '$9x^6$', '$3x^6$', '$27x^5$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Apply the power to both the coefficient and the variable.',
    solution: '$(3x^2)^3 = 3^3 \\cdot (x^2)^3 = 27x^6$.',
  },
  {
    question: 'Simplify $\\frac{4x^5 y^{-2}}{2x^3 y}$.',
    options: ['$\\frac{2x^2}{y^3}$', '$2x^2 y^3$', '$\\frac{2x^8}{y^3}$', '$\\frac{2x^2}{y^2}$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Divide coefficients; subtract exponents for same bases.',
    solution: '$\\frac{4}{2} \\cdot x^{5-3} \\cdot y^{-2-1} = 2x^2 y^{-3} = \\frac{2x^2}{y^3}$.',
  },
  {
    question: 'Simplify $\\frac{(2a^3 b^{-1})^3}{4a^2 b^{-5}}$.',
    options: ['$2a^7 b^2$', '$\\frac{2a^7}{b^2}$', '$8a^7 b^2$', '$2a^5 b^2$'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'First expand the numerator: $(2)^3(a^3)^3(b^{-1})^3$.',
    solution: 'Numerator: $8a^9 b^{-3}$.\n$\\frac{8a^9 b^{-3}}{4a^2 b^{-5}} = 2 a^7 b^{-3-(-5)} = 2a^7 b^2$.',
  },
],

// ---- m1-ex-2: Scientific Notation ----
'm1-ex-2': [
  {
    question: 'Write $35{,}000$ in scientific notation.',
    options: ['$3.5 \\times 10^4$', '$35 \\times 10^3$', '$3.5 \\times 10^3$', '$0.35 \\times 10^5$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Move the decimal until you have a number between 1 and 10.',
    solution: '$35{,}000 = 3.5 \\times 10^4$ (moved decimal 4 places left).',
  },
  {
    question: 'Write $0.0047$ in scientific notation.',
    options: ['$4.7 \\times 10^{-3}$', '$47 \\times 10^{-4}$', '$4.7 \\times 10^3$', '$4.7 \\times 10^{-2}$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Move the decimal right until you get a number between 1 and 10. Count the moves.',
    solution: '$0.0047 = 4.7 \\times 10^{-3}$ (moved decimal 3 places right).',
  },
  {
    question: 'Compute $(4 \\times 10^3)(3 \\times 10^5)$.',
    options: ['$1.2 \\times 10^9$', '$12 \\times 10^8$', '$1.2 \\times 10^8$', '$7 \\times 10^8$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Multiply coefficients, add exponents.',
    solution: '$4 \\times 3 = 12$. $10^3 \\times 10^5 = 10^8$. $12 \\times 10^8 = 1.2 \\times 10^9$.',
  },
  {
    question: 'Compute $\\frac{8.4 \\times 10^7}{2.1 \\times 10^3}$.',
    options: ['$4 \\times 10^4$', '$4 \\times 10^{10}$', '$6.3 \\times 10^4$', '$4.2 \\times 10^4$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Divide coefficients, subtract exponents.',
    solution: '$8.4 / 2.1 = 4$. $10^{7-3} = 10^4$. Answer: $4 \\times 10^4$.',
  },
  {
    question: 'Compute $(6 \\times 10^{-4})^2$ in scientific notation.',
    options: ['$3.6 \\times 10^{-7}$', '$36 \\times 10^{-8}$', '$3.6 \\times 10^{-8}$', '$6 \\times 10^{-8}$'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'Square the coefficient and multiply the exponent by 2.',
    solution: '$6^2 = 36$. $(10^{-4})^2 = 10^{-8}$. $36 \\times 10^{-8} = 3.6 \\times 10^{-7}$.',
  },
],

// ---- m1-ex-3: Exponential Growth & Decay ----
'm1-ex-3': [
  {
    question: 'A population of 100 grows at 10% per year. What is the population after 2 years?',
    options: ['$121$', '$120$', '$110$', '$100$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Use $y = 100(1.10)^2$.',
    solution: '$100(1.10)^2 = 100(1.21) = 121$.',
  },
  {
    question: 'A substance decays by 50% every 4 hours (half-life = 4 hr). Starting with 80g, how much after 8 hours?',
    options: ['$20$ g', '$40$ g', '$10$ g', '$0$ g'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: '8 hours = 2 half-lives.',
    solution: 'After 4 hr: $80/2 = 40$g. After 8 hr: $40/2 = 20$g. Or $80(1/2)^2 = 20$g.',
  },
  {
    question: 'An investment of \\$2000 earns 5% annually. What is it worth after 3 years?',
    options: ['$\\$2315.25$', '$\\$2300$', '$\\$2150$', '$\\$6000$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Use $A = 2000(1.05)^3$.',
    solution: '$2000(1.05)^3 = 2000(1.157625) = \\$2315.25$.',
  },
  {
    question: 'A car depreciates 15% per year. If it starts at \\$20,000, what is its value after 2 years?',
    options: ['$\\$14{,}450$', '$\\$17{,}000$', '$\\$14{,}000$', '$\\$13{,}600$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Decay factor is $0.85$. Use $20000(0.85)^2$.',
    solution: '$20000(0.85)^2 = 20000(0.7225) = \\$14{,}450$.',
  },
  {
    question: 'A colony of bacteria triples every 5 hours. Starting with 200, how many after 15 hours?',
    options: ['$5400$', '$1800$', '$600$', '$16200$'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: '15 hours = 3 periods of 5 hours. Multiply by 3 each period.',
    solution: '$200 \\times 3^{15/5} = 200 \\times 3^3 = 200 \\times 27 = 5400$.',
  },
],

// ---- m1-po-1: Polynomial Operations ----
'm1-po-1': [
  {
    question: 'Add: $(3x^2 + 2x) + (x^2 - 5x + 4)$',
    options: ['$4x^2 - 3x + 4$', '$4x^2 + 7x + 4$', '$3x^2 - 3x + 4$', '$4x^2 - 3x - 4$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Combine like terms.',
    solution: '$(3x^2+x^2)+(2x-5x)+4 = 4x^2 - 3x + 4$.',
  },
  {
    question: 'Subtract: $(5x^2 + 3x - 1) - (2x^2 - x + 4)$',
    options: ['$3x^2 + 4x - 5$', '$3x^2 + 2x + 3$', '$7x^2 + 2x + 3$', '$3x^2 + 4x + 5$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Distribute the negative to ALL terms in the second polynomial.',
    solution: '$5x^2+3x-1-2x^2+x-4 = 3x^2+4x-5$.',
  },
  {
    question: 'Multiply: $(x + 3)(x - 5)$',
    options: ['$x^2 - 2x - 15$', '$x^2 + 2x - 15$', '$x^2 - 8x - 15$', '$x^2 - 2x + 15$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Use FOIL: First, Outer, Inner, Last.',
    solution: '$x^2 - 5x + 3x - 15 = x^2 - 2x - 15$.',
  },
  {
    question: 'Expand: $(2x - 1)^2$',
    options: ['$4x^2 - 4x + 1$', '$4x^2 - 1$', '$4x^2 - 2x + 1$', '$2x^2 - 2x + 1$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: '$(a-b)^2 = a^2 - 2ab + b^2$.',
    solution: '$(2x)^2 - 2(2x)(1) + 1^2 = 4x^2 - 4x + 1$.\n\nIf you got $4x^2 - 1$, you used difference of squares instead of squaring.',
  },
  {
    question: 'Multiply: $(x + 2)(x^2 - 3x + 1)$',
    options: ['$x^3 - x^2 - 5x + 2$', '$x^3 + 2x^2 - 3x + 1$', '$x^3 - x^2 + 5x + 2$', '$x^3 - 5x^2 - x + 2$'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'Distribute each term of $(x+2)$ across the trinomial.',
    solution: '$x(x^2-3x+1) + 2(x^2-3x+1)$\n$= x^3 - 3x^2 + x + 2x^2 - 6x + 2$\n$= x^3 - x^2 - 5x + 2$.',
  },
],

// ---- m1-po-2: Factoring Polynomials ----
'm1-po-2': [
  {
    question: 'Factor: $5x^2 + 10x$',
    options: ['$5x(x + 2)$', '$x(5x + 10)$', '$5(x^2 + 2x)$', '$10x(x + 1)$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Factor out the GCF.',
    solution: 'GCF = $5x$. $5x^2 + 10x = 5x(x + 2)$.',
  },
  {
    question: 'Factor: $x^2 - 25$',
    options: ['$(x - 5)(x + 5)$', '$(x - 5)^2$', '$(x + 5)^2$', '$(x - 25)(x + 1)$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'This is a difference of squares: $a^2 - b^2 = (a-b)(a+b)$.',
    solution: '$x^2 - 25 = x^2 - 5^2 = (x-5)(x+5)$.',
  },
  {
    question: 'Factor: $x^2 + 5x + 6$',
    options: ['$(x + 2)(x + 3)$', '$(x + 1)(x + 6)$', '$(x - 2)(x - 3)$', '$(x + 5)(x + 1)$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Find two numbers that add to 5 and multiply to 6.',
    solution: '$2 + 3 = 5$ and $2 \\times 3 = 6$. So $(x+2)(x+3)$.',
  },
  {
    question: 'Factor: $x^2 - 7x + 12$',
    options: ['$(x - 3)(x - 4)$', '$(x + 3)(x + 4)$', '$(x - 2)(x - 6)$', '$(x - 1)(x - 12)$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Find two numbers that add to $-7$ and multiply to $12$.',
    solution: '$(-3)+(-4) = -7$ and $(-3)(-4) = 12$. So $(x-3)(x-4)$.',
  },
  {
    question: 'Factor completely: $3x^2 + 10x - 8$',
    options: ['$(3x - 2)(x + 4)$', '$(3x + 2)(x - 4)$', '$(x - 2)(3x + 4)$', '$(3x + 8)(x - 1)$'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'Use the AC method: $a \\cdot c = 3(-8) = -24$. Find two numbers that multiply to $-24$ and add to $10$.',
    solution: 'Need numbers multiplying to $-24$, adding to $10$: that is $12$ and $-2$.\n$3x^2 + 12x - 2x - 8 = 3x(x+4) - 2(x+4) = (3x-2)(x+4)$.\nCheck: $3x^2+12x-2x-8 = 3x^2+10x-8$ ✓.',
  },
],

// ---- m1-sq-1: Arithmetic Sequences ----
'm1-sq-1': [
  {
    question: 'Find the common difference: $3, 8, 13, 18, \\ldots$',
    options: ['$d = 5$', '$d = 3$', '$d = 8$', '$d = 11$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Subtract consecutive terms: $8 - 3$.',
    solution: '$d = 8 - 3 = 5$.',
  },
  {
    question: 'Find $a_{10}$ for the sequence $2, 5, 8, 11, \\ldots$',
    options: ['$29$', '$32$', '$26$', '$35$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Use $a_n = a_1 + (n-1)d$ with $a_1 = 2$ and $d = 3$.',
    solution: '$a_{10} = 2 + 9(3) = 2 + 27 = 29$.',
  },
  {
    question: 'The 3rd term is 11 and the 7th term is 27. Find $d$.',
    options: ['$d = 4$', '$d = 8$', '$d = 16$', '$d = 2$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'From term 3 to term 7 is 4 steps. Use $a_7 - a_3 = 4d$.',
    solution: '$27 - 11 = 16 = 4d$, so $d = 4$.',
  },
  {
    question: 'Find the sum of the first 10 terms: $1, 4, 7, 10, \\ldots$',
    options: ['$145$', '$100$', '$130$', '$155$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Use $S_n = \\frac{n}{2}(a_1 + a_n)$. First find $a_{10}$.',
    solution: '$a_{10} = 1 + 9(3) = 28$. $S_{10} = \\frac{10}{2}(1 + 28) = 5(29) = 145$.',
  },
  {
    question: 'Is $200$ a term in the sequence $7, 15, 23, 31, \\ldots$?',
    options: ['No', 'Yes, the 25th term', 'Yes, the 24th term', 'Yes, the 26th term'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'Set $a_n = 7 + 8(n-1) = 200$ and check if $n$ is a positive integer.',
    solution: '$8(n-1) = 193$. $n - 1 = 24.125$. Not an integer, so 200 is NOT a term.',
  },
],

// ---- m1-sq-2: Geometric Sequences ----
'm1-sq-2': [
  {
    question: 'Find the common ratio: $4, 12, 36, 108, \\ldots$',
    options: ['$r = 3$', '$r = 4$', '$r = 8$', '$r = 12$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Divide a term by the previous term.',
    solution: '$r = 12/4 = 3$.',
  },
  {
    question: 'Find $a_5$ for the sequence $2, 6, 18, \\ldots$',
    options: ['$162$', '$54$', '$486$', '$108$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: '$r = 3$, $a_1 = 2$. Use $a_n = a_1 \\cdot r^{n-1}$.',
    solution: '$a_5 = 2 \\cdot 3^4 = 2 \\cdot 81 = 162$.',
  },
  {
    question: 'Find $a_4$ for $5, -10, 20, \\ldots$',
    options: ['$-40$', '$40$', '$-80$', '$80$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: '$r = -10/5 = -2$.',
    solution: '$a_4 = 5 \\cdot (-2)^3 = 5(-8) = -40$.',
  },
  {
    question: 'In a geometric sequence, $a_2 = 6$ and $a_5 = 162$. Find $r$.',
    options: ['$r = 3$', '$r = 9$', '$r = 27$', '$r = 6$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: '$a_5 = a_2 \\cdot r^3$.',
    solution: '$162 = 6 \\cdot r^3$. $r^3 = 27$. $r = 3$.',
  },
  {
    question: 'Find the 8th term: $\\frac{1}{2}, 1, 2, 4, \\ldots$',
    options: ['$64$', '$32$', '$128$', '$16$'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: '$r = 2$, $a_1 = 1/2$. Use $a_n = a_1 \\cdot r^{n-1}$.',
    solution: '$a_8 = \\frac{1}{2} \\cdot 2^7 = \\frac{128}{2} = 64$.',
  },
],

// ---- m1-ge-1: Angle Relationships ----
'm1-ge-1': [
  {
    question: 'Two angles are complementary. One is $35°$. Find the other.',
    options: ['$55°$', '$145°$', '$65°$', '$35°$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Complementary angles sum to $90°$.',
    solution: '$90° - 35° = 55°$.',
  },
  {
    question: 'Two vertical angles are formed by intersecting lines. One is $72°$. What is the other?',
    options: ['$72°$', '$108°$', '$18°$', '$144°$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Vertical angles are always equal.',
    solution: 'Vertical angles are equal, so the other is also $72°$.',
  },
  {
    question: 'Parallel lines with a transversal: one angle is $115°$. Find its alternate interior angle.',
    options: ['$115°$', '$65°$', '$180°$', '$25°$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Alternate interior angles are equal when lines are parallel.',
    solution: 'Alternate interior angles with parallel lines are equal: $115°$.',
  },
  {
    question: 'Parallel lines with a transversal: one angle is $3x + 10$ and its co-interior angle is $2x + 20$. Find $x$.',
    options: ['$x = 30$', '$x = 20$', '$x = 40$', '$x = 50$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Co-interior (same-side interior) angles are supplementary: they add to $180°$.',
    solution: '$(3x+10) + (2x+20) = 180$\n$5x + 30 = 180$\n$5x = 150$\n$x = 30$.',
  },
  {
    question: 'Two parallel lines are cut by a transversal. Angle 1 is $(4x-5)°$ and its corresponding angle is $(3x+15)°$. Find both angles.',
    options: ['$75°$ each', '$80°$ each', '$60°$ each', '$85°$ each'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'Corresponding angles are equal. Set them equal and solve for $x$.',
    solution: '$4x - 5 = 3x + 15$\n$x = 20$\nAngle $= 4(20)-5 = 75°$.',
  },
],

// ---- m1-ge-2: Triangle Properties ----
'm1-ge-2': [
  {
    question: 'A triangle has angles $50°$ and $60°$. Find the third angle.',
    options: ['$70°$', '$80°$', '$90°$', '$110°$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Triangle angles sum to $180°$.',
    solution: '$180° - 50° - 60° = 70°$.',
  },
  {
    question: 'Can a triangle have sides of length 3, 5, and 9?',
    options: ['No', 'Yes', 'Only if it is obtuse', 'Only if it is right'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Check the triangle inequality: sum of any two sides > third side.',
    solution: '$3 + 5 = 8 < 9$. Fails the triangle inequality, so no.',
  },
  {
    question: 'An exterior angle of a triangle is $130°$. The two remote interior angles are $x°$ and $(x+30)°$. Find $x$.',
    options: ['$x = 50$', '$x = 65$', '$x = 80$', '$x = 40$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Exterior angle = sum of remote interior angles.',
    solution: '$x + (x + 30) = 130$\n$2x + 30 = 130$\n$2x = 100$\n$x = 50$.',
  },
  {
    question: 'Triangle angles are $(2x)°$, $(3x - 10)°$, and $(x + 10)°$. Find all three angles.',
    options: ['$60°, 80°, 40°$', '$50°, 65°, 65°$', '$70°, 70°, 40°$', '$90°, 60°, 30°$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Set the sum to $180°$ and solve for $x$.',
    solution: '$2x + 3x - 10 + x + 10 = 180$\n$6x = 180$\n$x = 30$\nAngles: $60°, 80°, 40°$.',
  },
  {
    question: 'Two sides of a triangle are 7 and 13. What integer values can the third side $s$ take?',
    options: ['$7, 8, 9, \\ldots, 19$ (13 values)', '$1, 2, \\ldots, 19$', '$6, 7, \\ldots, 20$', '$7, 8, 9, \\ldots, 20$ (14 values)'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'Triangle inequality: $|13-7| < s < 13+7$, so $6 < s < 20$.',
    solution: '$6 < s < 20$. Integer values: $s = 7, 8, 9, \\ldots, 19$. That is $19 - 7 + 1 = 13$ values.',
  },
],

// ---- m1-ge-3: Coordinate Geometry ----
'm1-ge-3': [
  {
    question: 'Find the midpoint of $(2, 8)$ and $(6, 4)$.',
    options: ['$(4, 6)$', '$(8, 12)$', '$(3, 5)$', '$(4, 4)$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Average the $x$-coordinates and the $y$-coordinates.',
    solution: '$M = \\left(\\frac{2+6}{2}, \\frac{8+4}{2}\\right) = (4, 6)$.',
  },
  {
    question: 'Find the distance between $(0, 0)$ and $(3, 4)$.',
    options: ['$5$', '$7$', '$\\sqrt{7}$', '$25$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Use $d = \\sqrt{(\\Delta x)^2 + (\\Delta y)^2}$.',
    solution: '$d = \\sqrt{9 + 16} = \\sqrt{25} = 5$.',
  },
  {
    question: 'Find the distance between $(-2, 3)$ and $(4, -5)$.',
    options: ['$10$', '$8$', '$\\sqrt{40}$', '$14$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: '$\\Delta x = 6$, $\\Delta y = -8$.',
    solution: '$d = \\sqrt{6^2 + (-8)^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$.',
  },
  {
    question: 'Line 1 has slope $4$. Line 2 is perpendicular. What is Line 2\'s slope?',
    options: ['$-\\frac{1}{4}$', '$\\frac{1}{4}$', '$-4$', '$4$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Perpendicular slopes multiply to $-1$.',
    solution: '$m_2 = -\\frac{1}{4}$. Check: $4 \\times (-\\frac{1}{4}) = -1$ ✓.',
  },
  {
    question: 'Show that the triangle with vertices $A(1, 1)$, $B(4, 5)$, $C(7, 1)$ is isosceles by finding the side lengths.',
    options: ['$AB = BC = 5$, $AC = 6$', '$AB = AC = 5$, $BC = 6$', '$AB = BC = AC = 5$', '$AB = 5, BC = 4, AC = 6$'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'Compute $AB$, $BC$, and $AC$ using the distance formula.',
    solution: '$AB = \\sqrt{(4-1)^2+(5-1)^2} = \\sqrt{9+16} = 5$\n$BC = \\sqrt{(7-4)^2+(1-5)^2} = \\sqrt{9+16} = 5$\n$AC = \\sqrt{(7-1)^2+(1-1)^2} = \\sqrt{36} = 6$\n$AB = BC = 5$, isosceles.',
  },
],

// ---- m1-st-1: Measures of Center & Spread ----
'm1-st-1': [
  {
    question: 'Find the mean of $4, 7, 10, 3, 6$.',
    options: ['$6$', '$7$', '$5$', '$30$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Add all values and divide by the count.',
    solution: '$\\frac{4+7+10+3+6}{5} = \\frac{30}{5} = 6$.',
  },
  {
    question: 'Find the median of $12, 5, 8, 15, 3$.',
    options: ['$8$', '$5$', '$12$', '$8.6$'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Order the data first, then find the middle value.',
    solution: 'Ordered: $3, 5, 8, 12, 15$. Middle value = $8$.',
  },
  {
    question: 'Find the IQR of $2, 5, 7, 9, 11, 13, 15$.',
    options: ['$8$', '$6$', '$10$', '$13$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: '$Q_1$ is the median of the lower half; $Q_3$ is the median of the upper half.',
    solution: 'Lower half: $2, 5, 7$ → $Q_1 = 5$.\nUpper half: $11, 13, 15$ → $Q_3 = 13$.\nIQR $= 13 - 5 = 8$.',
  },
  {
    question: 'Data: $10, 12, 14, 14, 16, 18$. Find the median.',
    options: ['$14$', '$13$', '$14.5$', '$15$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'With 6 values, the median is the average of the 3rd and 4th values.',
    solution: 'Ordered: $10, 12, 14, 14, 16, 18$. Middle pair: $14, 14$. Median $= \\frac{14+14}{2} = 14$.',
  },
  {
    question: 'Data: $3, 5, 7, 9, 11, 13, 50$. Is 50 an outlier using the $1.5 \\times \\text{IQR}$ rule?',
    options: ['Yes', 'No', 'Need more data', 'Only if $n > 10$'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'Find $Q_1$, $Q_3$, IQR, then check if $50 > Q_3 + 1.5 \\cdot \\text{IQR}$.',
    solution: '$Q_1 = 5$, $Q_3 = 13$, IQR $= 8$.\nUpper fence $= 13 + 1.5(8) = 13 + 12 = 25$.\n$50 > 25$, so yes, 50 is an outlier.',
  },
],

// ---- m1-st-2: Data Displays ----
'm1-st-2': [
  {
    question: 'Which display shows the five-number summary visually?',
    options: ['Box plot', 'Histogram', 'Pie chart', 'Bar graph'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Think about which display shows min, $Q_1$, median, $Q_3$, max.',
    solution: 'A box plot (box-and-whisker) displays the five-number summary.',
  },
  {
    question: 'In a histogram, what does the height of each bar represent?',
    options: ['Frequency (count)', 'The data value', 'The mean', 'The range'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'Histograms show how many data points fall in each interval.',
    solution: 'The height represents the frequency — how many data points are in that interval.',
  },
  {
    question: 'A distribution is skewed right. Which is likely larger: the mean or the median?',
    options: ['The mean', 'The median', 'They are equal', 'Cannot tell'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Skewed right means a long tail to the right, which pulls the mean higher.',
    solution: 'In a right-skewed distribution, the mean is pulled toward the tail, so mean > median.',
  },
  {
    question: 'Which display preserves individual data values while showing the shape of the distribution?',
    options: ['Stem-and-leaf plot', 'Histogram', 'Box plot', 'Pie chart'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Think about which display lets you read back the original data.',
    solution: 'A stem-and-leaf plot shows the shape while preserving each individual value.',
  },
  {
    question: 'Two data sets have the same median but different IQRs. Which display best shows this difference?',
    options: ['Side-by-side box plots', 'Pie charts', 'Single histogram', 'Frequency table'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'You need a display that shows both center and spread for comparison.',
    solution: 'Side-by-side box plots clearly show the same median but different IQRs (box widths).',
  },
],

// ---- m1-st-3: Scatter Plots & Correlation ----
'm1-st-3': [
  {
    question: 'A scatter plot shows points going up from left to right. What type of correlation is this?',
    options: ['Positive', 'Negative', 'No correlation', 'Inverse'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: 'As $x$ increases, $y$ increases.',
    solution: 'Points rising from left to right indicate a positive correlation.',
  },
  {
    question: 'The correlation coefficient $r = 0.02$. What does this mean?',
    options: ['Very weak or no linear relationship', 'Strong positive', 'Strong negative', 'Perfect correlation'],
    correctIndex: 0,
    difficulty: 'easy',
    hint: '$r$ close to 0 means little or no linear relationship.',
    solution: '$r = 0.02$ is very close to 0, indicating virtually no linear relationship.',
  },
  {
    question: 'A regression equation is $\\hat{y} = 3x + 5$. Predict $\\hat{y}$ when $x = 10$.',
    options: ['$35$', '$30$', '$50$', '$15$'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: 'Substitute $x = 10$ into the equation.',
    solution: '$\\hat{y} = 3(10) + 5 = 35$.',
  },
  {
    question: 'Data range is $x \\in [10, 50]$. A student uses the regression line to predict at $x = 100$. What is this called?',
    options: ['Extrapolation', 'Interpolation', 'Correlation', 'Regression'],
    correctIndex: 0,
    difficulty: 'medium',
    hint: '$x = 100$ is outside the range of the data.',
    solution: 'Predicting outside the data range is called extrapolation. It is unreliable.',
  },
  {
    question: 'Two variables have $r = -0.95$. A student claims "X causes Y to decrease." What is wrong with this claim?',
    options: ['Correlation does not imply causation', 'The correlation is not strong enough', '$r$ should be positive for a causal claim', 'Nothing is wrong'],
    correctIndex: 0,
    difficulty: 'hard',
    hint: 'Even very strong correlations do not prove cause and effect.',
    solution: 'Correlation does not imply causation. There could be a lurking variable, reverse causation, or coincidence. A strong $r$ only shows association, not cause.',
  },
],

};
