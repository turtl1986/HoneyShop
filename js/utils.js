function createElement(tag, cl = null, text = null, attrs = {}) {
    const el = document.createElement(tag)
    if (cl) el.className = cl
    if (text) el.textContent = text

    Object.entries(attrs).forEach(([key, value]) => {
        if (key === 'width' || key === 'height') el[key] = Number(value)
        else el.setAttribute(key, String(value));

    })

    return el
}