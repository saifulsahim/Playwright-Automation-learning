Feature: Ecommerce validations
    @Validation
    Scenario Outline: Placing the order
        Given A login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is displayed

    Examples: 
        | username               | password   | 
        | saifulsahim@gmail.com  | Sahim123#  | 
        | saiful@gmail.com       | Fahim123#  |  