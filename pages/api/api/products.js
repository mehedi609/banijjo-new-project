export default (req, res) => {
    res.statusCode = 200
    let products = [
        {
            "product_name": "T-Shirt",
            "product_price": "1500.00",
            "product_url": "product full url",
            "product_image": "product image full url",
        },
        {
            "product_name": "T-Shirt-2",
            "product_price": "1200.00",
            "product_url": "product full url 2",
            "product_image": "product image full url 2",
        },
    ]
        
    res.json({ products })
  }
  