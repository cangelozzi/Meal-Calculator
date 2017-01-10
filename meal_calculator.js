var $ = jQuery;
$(document).ready(function () {
  
  // create array of dishes 
  var dishesAndPrices = {
    Starter: 2,
    Soup: 2,
    'Main Course': 8,
    Salad: 4,
    Dessert: 4,
    Drinks: 3
  };

  // attach details to DOM
  var menu = '<input type="checkbox" name="dishes" id="starter" value="Starter">' + Object.keys(dishesAndPrices)[0] + '<br><input type="checkbox" name="dishes" id="soup" value="Soup">' + Object.keys(dishesAndPrices)[1] + '<br><input type="checkbox" name="dishes" id="main" value="Main Course">' + Object.keys(dishesAndPrices)[2] + '<br><input type="checkbox" name="dishes" id="salad" value="Salad">' + Object.keys(dishesAndPrices)[3] + '<br><input type="checkbox" name="dishes" id="dessert" value="Dessert">' + Object.keys(dishesAndPrices)[4] + '<br><input type="checkbox" name="dishes" id="drinks" value="Drinks">' + Object.keys(dishesAndPrices)[5] + '<br><br>';

  $('.dishes').append(menu);

  // create button event to submit Name and dishes choice
  $('#button').on("click", function (event) {
    event.preventDefault();
    var inputName = $('.name').val();

    // array of dishes selected
    var selectedDishes = [];
    $("input:checkbox[name=dishes]:checked").each(function () {
      selectedDishes.push($(this).val());
    });

    // function to calculate meal price
    var mealPrice = 0;

    function price() {
      for (var i = 0; i < selectedDishes.length; i++) {

        if (selectedDishes[i] in dishesAndPrices) {
          mealPrice = mealPrice + dishesAndPrices[selectedDishes[i]];
        }
      }
    }
    price();

    // function to calculate taxes on the meal
    var mealTax = 0;

    function tax() {
      mealTax = mealPrice * 0.27;
    }
    tax();

    // function to calculate tip on the meal
    var mealTip = 0;

    function tip() {
      mealTip = (mealPrice + mealTax) * 0.10;
    }
    tip();

    // Object Constructor Function to "create" diners
    function Diner(name, meal, mealPrice, mealTax, mealTip) {
      this.name = name;
      this.meal = meal;
      this.mealPrice = mealPrice;
      this.mealTax = mealTax;
      this.mealTip = mealTip;
    }

    // diner object
    var dinerData = new Diner(inputName, selectedDishes, mealPrice, mealTax, mealTip);

    // meal total to be added to the bill
    var mealTotal = (mealPrice + mealTax + mealTip);
    totalTip.push(mealTip);

    // Object 'Bill' literal construction (property and 3x methods)
    var bill = {
      diners: [],
      calculateMealsAndTaxesTotals: function () {
        totalMealAndTaxPrice.push(mealPrice + mealTax);
        var sum = totalMealAndTaxPrice.reduce(function (sum, totals) {
          return sum + totals;
        }, 0);
        return sum;
      },
      calculateTips: function () {
        //totalTip.push(mealTip);

        var tipSum = totalTip.reduce(function (sum, tips) {
          return sum + tips;
        }, 0);
        return tipSum;
      },
      singleDinerDetails: function () {
        var dinersDetails = inputName + ' - Meal Total = ' + mealTotal + ' (including Tax for: ' + mealTax + ' , and Tip for: ' + mealTip + ')';
        return dinersDetails;
      },
    };

    // Diners and Total Bill details
    dinersList.push(dinerData);
    bill.diners = dinersList;

    var total = bill.calculateMealsAndTaxesTotals() + bill.calculateTips();
    var waitressTip = bill.calculateTips().toFixed(2);

    var billTotal = '<li><strong>Total Bill</strong> for all diners (taxes & tips included): <strong>' + total.toFixed(2) + '</strong>;<br><strong>Total Tip</strong> for the waitress: <strong>' + waitressTip + '<strong>;</li>';
    $('.theFinalBill ul').empty();
    $('.theFinalBill ul').append(billTotal);


    var diners = '<li><strong>' + inputName + '</strong> - ' + '(' + selectedDishes + ')' + '  - Total including tax (' + mealTax + ') & tip (' + mealTip.toFixed(2) + ') = <strong><u>' + mealTotal.toFixed(2) + ';</strong></u></li>';

    $('.dinersBreakdown ul').append(diners);

  });

  var dinersList = [];
  var totalMealAndTaxPrice = [];
  var totalTip = [];

});