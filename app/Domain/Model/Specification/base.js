serviceLocator.registerModule('Specification', function() 
{
    class Specification
    {
        And(specification)
        {
            return new AndSpecification(this, specification)
        }
        Or(specification)
        {
            return new OrSpecification(this, specification)
        }
        Not(specification)
        {
            return new NotSpecification(this)
        }
    }

    class AndSpecification extends Specification
    {
        constructor(leftSpecificaion, rightSpecification)
        {
            super()
            this.LeftSpecification = leftSpecificaion
            this.RightSpecification = rightSpecification
        }
    }
    class OrSpecification extends Specification
    {
        constructor(leftSpecificaion, rightSpecification)
        {
            super()
            this.LeftSpecification = leftSpecificaion
            this.RightSpecification = rightSpecification
        }
    }
    class NotSpecification extends Specification
    {
        constructor(specification)
        {
            super()
            this.Specification = specification
        }
    }
    class ExpressionSpecification extends Specification
    {
        constructor()
        {
            super()
        }
    }
    class LessThan extends ExpressionSpecification
    {
        constructor(attrName, val)
        {
            super()
            this.AttrName = attrName
            this.Value = val
        }
    }
    class MoreThan extends ExpressionSpecification
    {
        constructor(attrName, val)
        {
            super()
            this.AttrName = attrName
            this.Value = val
        }
    }
    class Between extends ExpressionSpecification
    {
        constructor(attrName, min, max)
        {
            super()
            this.AttrName = attrName
            this.Min = min
            this.Max = max
        }
    }
    class Equals extends ExpressionSpecification
    {
        constructor(attrName, val)
        {
            super()
            this.AttrName = attrName
            this.Value = val
        }
    }

    return {
        Specification,
        Compose:
        {
            AndSpecification,
            OrSpecification,
            NotSpecification
        },
        Expression:
        {
            LessThan,
            MoreThan,
            Equals,
            Between
        }
    }
})