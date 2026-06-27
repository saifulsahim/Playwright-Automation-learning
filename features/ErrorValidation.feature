Feature: Ecommerce validations
    @Validation
    Scenario: Placing the order
        Given A login to Ecommerce2 application with "saifulsahim@gmail.com" and "Sahim123#"
        Then Verify Error message is displayed