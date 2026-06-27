Feature: Ecommerce validations
    @Regression
    Scenario: Placing the order
        Given A login to Ecommerce application with "saifulsahim@gmail.com" and "Sahim123#"
        When Add "ZARA COAT 4" to cart
        Then Verify "ZARA COAT 3" is displayed in cart
        When Enter valid details and place the order
        Then Verify order is present in order history

    @Validation
    Scenario Outline: Placing the order
        Given A login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is displayed

        Examples:
            | username              | password  |
            | saifulsahim@gmail.com | Sahim123# |
            | saiful@gmail.com      | Fahim123# |