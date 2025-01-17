const menu = [
  {
    "availability": true,
    "name": "Winter Warmth Soup",
    "price": 719.2,
    "discountedPrice": 639.2,
    "category": ["winter"],
    "photo":
      "https://imgs.search.brave.com/pHTZ9h_QvFkFlXbnpEOqEX_NF-MsS0gECdp1RU1OeJc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy93aW50/ZXItc291cHMtdGFj/by1zb3VwLTE2NjQ1/NjE5MDEuanBlZz9j/cm9wPTF4dzoxeGg7/Y2VudGVyLHRvcCZy/ZXNpemU9OTgwOio",
    "description": "A hearty soup with seasonal vegetables and herbs."
  },
  {
    "availability": true,
    "name": "Christmas Turkey Platter",
    "price": 1999.2,
    "discountedPrice": 1759.2,
    "category": ["christmas"],
    "photo":
      "https://imgs.search.brave.com/SspO_OZnXTxJVyS1W4rmHQ9pGjnsNne62sQUqTx3iXU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy9jaHJp/c3RtYXMtdHVya2V5/LWRyeS1icmluZWQt/dHVya2V5LTE2MzUx/OTMxMjUuanBlZz9j/cm9wPTAuODAzeHc6/MS4wMHhoOzAuMTI2/eHcsMCZyZXNpemU9/OTgwOio",
    "description":
      "Tender turkey served with cranberry sauce and mashed potatoes."
  },
  {
    "availability": true,
    "name": "Cheese Burst Pizza Combo",
    "price": 1279.2,
    "discountedPrice": 1079.2,
    "category": ["combo"],
    "photo":
      "https://imgs.search.brave.com/_SJK2byMckALj0jhcPFGqsnR1VPkLZBZrijlIchqE38/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZG9taW5vcy5jby5p/bi8vZmlsZXMvaXRl/bXMvXzEzNDYxNjQ5/NTEuanBn",
    "description": "12-inch cheese burst pizza with garlic bread and a drink."
  },
  {
    "name": "Peppermint Hot Chocolate",
    "price": 479.2,
    "discountedPrice": 399.2,
    "availability": true,
    "category": ["winter", "christmas"],
    "photo":
      "https://imgs.search.brave.com/KboFfyMte9Xu7GO41ZOMxKDoc8-j_lIOQDPwRKm0ZgE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9qb3lm/b29kc3Vuc2hpbmUu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE5LzEyL3BlcHBl/cm1pbnQtaG90LWNo/b2NvbGF0ZS1yZWNp/cGUtNS5qcGc",
    "description": "Creamy hot chocolate with a hint of peppermint."
  },
  {
    "availability": true,
    "name": "BBQ Chicken Wings",
    "price": 799.2,
    "discountedPrice": 679.2,
    "category": ["hot-section", "combo"],
    "photo":
      "https://imgs.search.brave.com/aLwSNNw4abk7wBr0DY1QWeqMaXiTCQDpY53r3UnDRuw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdGhldGlw/c3lob3VzZXdpZmUu/b3JnL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDI0LzAxL2ltZ18x/MDk2LTEuanBnP3Jl/c2l6ZT04NDcsMTAy/NCZzc2w9MQ",
    "description": "Smoky and flavorful chicken wings served with BBQ sauce."
  },
  {
    "availability": true,
    "name": "Santa's Delight Cake",
    "price": 559.2,
    "discountedPrice": 479.2,
    "category": ["christmas"],
    "photo":
      "https://imgs.search.brave.com/QiDy_p_9kwjrvAOzD2ls03M4QGVafTSDOOMeC7tXe1c/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jaGVs/c3dlZXRzLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNy8x/Mi9jdXR0aW5nLXNs/aWNlLWZyb20tc2Fu/dGEtY2FrZS0yLTc2/OHgxMDI0LmpwZy53/ZWJw",
    "description": "A festive cake with layers of chocolate and mint frosting."
  },
  {
    "name": "Fiery Veggie Wrap",
    "price": 639.2,
    "discountedPrice": 559.2,
    "category": ["hot-section"],
    "availability": true,
    "photo":
      "https://imgs.search.brave.com/tdYOlpoKpGJEp4bu7A7eMuFBzx3lBeh0JmkCRtGDZ0w/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9vaG15/dmVnZ2llcy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMTQv/MDQvc291dGh3ZXN0/ZXJuX3ZlZ2dpZV93/cmFwcy02MDB4OTAw/LmpwZw",
    "description": "A spicy wrap filled with fresh vegetables and tangy sauce."
  },
  {
    "availability": true,
    "name": "Holiday Special Combo",
    "price": 2399.2,
    "discountedPrice": 2159.2,
    "category": ["combo", "christmas"],
    "photo":
      "https://imgs.search.brave.com/PpG9te7--rIGND8reZJIn5gjMHyTECRFI8AH6IOtfd4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE3/NzU4OTA0MS9waG90/by9tb21vLW9yLWR1/bXBsaW5ncy1zZXJ2/ZWQtaW4tYW4tZWdn/LXNoYXBlZC1wbGF0/ZS10b3Atdmlldy5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/elAzMGFCSGlkWUE3/eDhZV2ZETFcyY3Y5/TjBGQllDU0xoNFlo/MGFCSXRJTT0",
    "description":
      "Includes Christmas Turkey, Peppermint Hot Chocolate, and dessert."
  },
  {
    "name": "Spiced Pumpkin Latte",
    "availability": true,
    "price": 399.2,
    "discountedPrice": 319.2,
    "category": ["winter"],
    "photo":
      "https://imgs.search.brave.com/u1Xee6Q9XR25hCn0JBpI9iEAii3jW6MWG1L04x_eBJA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bGlxdW9yLmNvbS90/aG1iLzRvTWtZY1c0/Y19EQlU2SkM4MDYt/MjFpQkVEWT0vMTUw/MHgwL2ZpbHRlcnM6/bm9fdXBzY2FsZSgp/Om1heF9ieXRlcygx/NTAwMDApOnN0cmlw/X2ljYygpL19fb3B0/X19hYm91dGNvbV9f/Y29ldXNfX3Jlc291/cmNlc19fY29udGVu/dF9taWdyYXRpb25f/X2xpcXVvcl9fMjAx/N19fMTBfXzI1MDg0/MDI0X18xMS1Fc3Nl/bnRpYWwtQ29ja3Rh/aWxzLWZvci15b3Vy/LU5vdmVtYmVyLVBh/cnRpZXMtNzIweDcy/MC1hcnRpY2xlLTRl/MWQ1NzBhZGE0MDQw/NmE5ZTA3MWNhOTg4/ZGIxNDRhLmpwZw",
    "description": "Rich latte with pumpkin spice flavor and whipped cream."
  },
  {
    "availability": true,
    "name": "Winter Warmth Soup",
    "price": 719.2,
    "discountedPrice": 639.2,
    "category": ["winter"],
    "photo":
      "https://imgs.search.brave.com/pHTZ9h_QvFkFlXbnpEOqEX_NF-MsS0gECdp1RU1OeJc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy93aW50/ZXItc291cHMtdGFj/by1zb3VwLTE2NjQ1/NjE5MDEuanBlZz9j/cm9wPTF4dzoxeGg7/Y2VudGVyLHRvcCZy/ZXNpemU9OTgwOio",
    "description": "A hearty soup with seasonal vegetables and herbs."
  },
  {
    "availability": true,
    "name": "Christmas Turkey Platter",
    "price": 1999.2,
    "discountedPrice": 1759.2,
    "category": ["christmas"],
    "photo":
      "https://imgs.search.brave.com/SspO_OZnXTxJVyS1W4rmHQ9pGjnsNne62sQUqTx3iXU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy9jaHJp/c3RtYXMtdHVya2V5/LWRyeS1icmluZWQt/dHVya2V5LTE2MzUx/OTMxMjUuanBlZz9j/cm9wPTAuODAzeHc6/MS4wMHhoOzAuMTI2/eHcsMCZyZXNpemU9/OTgwOio",
    "description":
      "Tender turkey served with cranberry sauce and mashed potatoes."
  },
  {
    "name": "Cheese Burst Pizza Combo",
    "availability": true,
    "price": 1279.2,
    "discountedPrice": 1079.2,
    "category": ["combo"],
    "photo":
      "https://imgs.search.brave.com/_SJK2byMckALj0jhcPFGqsnR1VPkLZBZrijlIchqE38/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZG9taW5vcy5jby5p/bi8vZmlsZXMvaXRl/bXMvXzEzNDYxNjQ5/NTEuanBn",
    "description": "12-inch cheese burst pizza with garlic bread and a drink."
  },
  {
    "name": "Peppermint Hot Chocolate",
    "price": 479.2,
    "discountedPrice": 399.2,
    "availability": true,
    "category": ["winter", "christmas"],
    "photo":
      "https://imgs.search.brave.com/KboFfyMte9Xu7GO41ZOMxKDoc8-j_lIOQDPwRKm0ZgE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9qb3lm/b29kc3Vuc2hpbmUu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE5LzEyL3BlcHBl/cm1pbnQtaG90LWNo/b2NvbGF0ZS1yZWNp/cGUtNS5qcGc",
    "description": "Creamy hot chocolate with a hint of peppermint."
  },
  {
    "name": "BBQ Chicken Wings",
    "availability": true,
    "price": 799.2,
    "discountedPrice": 679.2,
    "category": ["hot-section", "combo"],
    "photo":
      "https://imgs.search.brave.com/aLwSNNw4abk7wBr0DY1QWeqMaXiTCQDpY53r3UnDRuw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdGhldGlw/c3lob3VzZXdpZmUu/b3JnL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDI0LzAxL2ltZ18x/MDk2LTEuanBnP3Jl/c2l6ZT04NDcsMTAy/NCZzc2w9MQ",
    "description": "Smoky and flavorful chicken wings served with BBQ sauce."
  },
  {
    "name": "Fiery Veggie Wrap",
    "price": 639.2,
    "discountedPrice": 559.2,
    "category": ["hot-section"],
    "photo":
      "https://imgs.search.brave.com/tdYOlpoKpGJEp4bu7A7eMuFBzx3lBeh0JmkCRtGDZ0w/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9vaG15/dmVnZ2llcy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMTQv/MDQvc291dGh3ZXN0/ZXJuX3ZlZ2dpZV93/cmFwcy02MDB4OTAw/LmpwZw",
    "availability": true,
    "description": "A spicy wrap filled with fresh vegetables and tangy sauce."
  },
  {
    "availability": true,
    "name": "Holiday Special Combo",
    "price": 2399.2,
    "discountedPrice": 2159.2,
    "category": ["combo", "christmas"],
    "photo":
      "https://imgs.search.brave.com/PpG9te7--rIGND8reZJIn5gjMHyTECRFI8AH6IOtfd4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE3/NzU4OTA0MS9waG90/by9tb21vLW9yLWR1/bXBsaW5ncy1zZXJ2/ZWQtaW4tYW4tZWdn/LXNoYXBlZC1wbGF0/ZS10b3Atdmlldy5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/elAzMGFCSGlkWUE3/eDhZV2ZETFcyY3Y5/TjBGQllDU0xoNFlo/MGFCSXRJTT0",
    "description":
      "Includes Christmas Turkey, Peppermint Hot Chocolate, and dessert."
  },
  {
    "name": "Eggnog Cheesecake",
    "availability": true,
    "price": 529.2,
    "discountedPrice": 459.2,
    "category": ["christmas"],
    "photo":
      "https://imgs.search.brave.com/WbnG5qgozEx8rMzC4NMT5dJbqebgE2ElrGLemb9bDv8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hc2hs/ZWVtYXJpZS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMTkv/MDYvY2hlZXNlY2Fr/ZS1tYWRlLXdpdGgt/ZWdnbm9nLmpwZw",
    "description": "Creamy eggnog cheesecake with a festive spiced topping."
  },
  {
    "name": "Cranberry Almond Scones",
    "price": 449.2,
    "discountedPrice": 389.2,
    "category": ["christmas"],
    "photo":
      "https://imgs.search.brave.com/B2yueKTS37e4fVwZsC8WTnuxAjm3uyAdvKZYhYlGzfU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/a2l0Y2hlbmZyYXUu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIyLzAyL0lNR18z/NTA5ZXN0LmpwZw",
    "availability": true,
    "description":
      "Flaky and buttery scones studded with cranberries and almonds."
  },
  {
    "name": "Garlic Breadsticks",
    "price": 289.2,
    "availability": true,
    "discountedPrice": 249.2,
    "category": ["combo"],
    "photo":
      "https://imgs.search.brave.com/fsafVkliQ_zUkCmzOmygoYl0R9Kmff7TVcLCCMi-faw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/Z2FybGljLWJyZWFk/c3RpY2tzLWZyb20t/bWVhbHMtaW4tbWlu/dXRlcy1ieS1iZXR0/ZXItaG9tZXMtdjAt/Z3I0c21vM251eDhj/MS5qcGc_d2lkdGg9/NjQwJmNyb3A9c21h/cnQmYXV0bz13ZWJw/JnM9ZjExYWJmOTU2/NmJjOWRlZGY1OWYz/ZmNjYTMwMjMyMzk4/Y2FhNzE2ZQ",
    "description":
      "Golden and crisp garlic breadsticks served with dipping sauce."
  },
  {
    "name": "Roasted Veggie Quinoa Salad",
    "price": 699.2,
    "discountedPrice": 589.2,
    "category": ["hot-section", "combo"],
    "photo":
      "https://imgs.search.brave.com/TQprQfnkoHUw0NSeSjK_mObpSaKZyH91uGOWZTqXLxc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZmxvYXRpbmdraXRj/aGVuLm5ldC93cC1j/b250ZW50L3VwbG9h/ZHMvMjAxOC8xMS9D/YXJyb3QtTWFzaC1P/cmFuZ2UtTWludC0x/LTQzNXg0MzUuanBn",
    "availability": true,
    "description":
      "A fresh quinoa salad topped with roasted vegetables and vinaigrette."
  },
  {
    "availability": true,
    "name": "Candy Cane Fudge",
    "price": 549.2,
    "discountedPrice": 489.2,
    "category": ["christmas"],
    "photo":
      "https://imgs.search.brave.com/DAHaBK89BxaPJUUYMXtEN-trxMud5ewIkKXJJfLOITU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2h1Z2FyeXN3ZWV0/cy5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTQvMDkvcGVw/cGVybWludC1mdWRn/ZS0xLTY5OHgxMDI0/LmpwZw",
    "description": "Rich fudge flavored with candy cane and a hint of mint."
  },
  {
    "name": "Apple Cinnamon Muffins",
    "availability": true,
    "price": 289.2,
    "discountedPrice": 249.2,
    "category": ["winter"],
    "photo":
      "https://imgs.search.brave.com/wf_cFfaWY-qItdrpLRhHNVwdMLkAoML0TIbdPXOhl-g/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zcC1h/by5zaG9ydHBpeGVs/LmFpL2NsaWVudC90/b193ZWJwLHFfZ2xv/c3N5LHJldF9pbWcs/d181MTIsaF83Njgv/aHR0cHM6Ly93d3cu/dGhlaHVuZ3J5aHV0/Y2guY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIwLzEyL0Fw/cGxlLUNpbm5hbW9u/LU11ZmZpbi1TdGFj/ay02ODN4MTAyNC5q/cGc",
    "description":
      "Soft and moist muffins with the flavors of apples and cinnamon."
  },
  {
    "name": "Chocolate Chip Cookies",
    "price": 399.2,
    "description": "Crispy cookies filled with gooey chocolate chips.",
    "discountedPrice": 329.2,
    "category": ["combo"],
    "availability": true,
    "photo":
      "https://imgs.search.brave.com/ePa-mXpHAFqr1YpUiR7LJ5ZXmTRNATt5rWBI17-yN3w/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvODQ1/MDUyNTkvcGhvdG8v/Mi1jaG9jb2xhdGUt/Y2hpcC1jb29raWVz/LW9uLWEtcGxhdGUu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PWx3WE4yTk81QWRK/bDRwMVZNSzZ6U1pk/dVQ3dVl5THpSZ3FZ/cEd1dkxLYWs9"
  }
]