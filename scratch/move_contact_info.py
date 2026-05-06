import re

with open("src/pages/Contact.jsx", "r") as f:
    content = f.read()

# 1. Extract the Compact Secondary Info block
info_block_pattern = re.compile(
    r'(\s*\{\/\* ── Compact Secondary Info \(Phone, Email, Socials\) ── \*\/}.*?</div>\s*</div>\s*)</div>\s*(?=</motion\.div>)',
    re.DOTALL
)

# Actually, finding the exact block by string might be easier
# Let's read the file line by line to find it, or use a known substring.
