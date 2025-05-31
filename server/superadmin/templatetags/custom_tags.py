from django import template

register = template.Library()


@register.filter(name='currency')
def currency(value):
    try:
        value = float(value)
    except (ValueError, TypeError):
        return value  # return as-is if not a number

    # Format to Indian currency
    s = f"{value:,.2f}"
    parts = s.split(".")
    whole = parts[0].replace(",", "")
    decimal = parts[1]

    # Indian formatting
    if len(whole) > 3:
        last3 = whole[-3:]
        rest = whole[:-3]
        rest = ",".join([rest[max(i - 2, 0):i]
                        for i in range(len(rest), 0, -2)][::-1])
        formatted = f"{rest},{last3}.{decimal}"
    else:
        formatted = f"{whole}.{decimal}"

    return f"₹{formatted}"
