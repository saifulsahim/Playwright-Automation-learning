Feature: Ecommerce validations

    Scenario: Placing the order
        Given A login to Ecommerce application with "saifulsahim@gmail.com" and "Sahim123#"
        When Add "ZARA COAT 3" to cart
        Then Verify "ZARA COAT 3" is displayed in cart
        When Enter valid details and place the order
        Then Verify order is present in order history