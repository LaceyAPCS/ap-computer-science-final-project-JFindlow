/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.  It's intended to be used at an MLH Localhost
 * Workshop.
 *
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/mlh/mlh-localhost-hacking-with-alexa
 **/

'use strict';
var stat = "";//Declaring all the variables needed to execute my code
var socialSecurityTotal = 0;
var medicareTotal = 0;
var federalTotal = 0;
var federalTotalDeducted = 0;
var stateTotal = 0;
var total = 0;
var totalAfterTaxes = 0;
var saved = 0;
var weeks = 0;
var savePerCheck = 0;
var handlers = {
  'LaunchRequest': function () {
       this.response.speak("Are you Single or Married").listen("Are you Single or Married");
      this.emit(':responseReady'); 

  },
  'status': function () {
      stat = this.event.request.intent.slots.marriageStatus.value;//Getting the first paramater
      this.response.speak("What is your annual income").listen("What is your annual income");
      this.emit(':responseReady');
  },
  'income': function () {
      total = this.event.request.intent.slots.annual.value;//Getting the second paramater
      if(stat == "married")//Checking if married
      {
        socialSecurityTotal = total * 0.062;//Social security tax calculation
        if(socialSecurityTotal > 7968)//Social security tax limit
        {
          socialSecurityTotal = 7968;
        }
        if(total > 250000)//Medicare tax total
        {
          medicareTotal = total * 0.0145 + (total - 250000) * 0.009;//Medicare tax calculation
        }
        else
        {
          medicareTotal = total * 0.0145;//Other medicare tax calculation
        }
        
        federalTotalDeducted = total - 12700;//Taking the federal standard deduction out of the total for married
        
        if(total <= 18650)//Federal tax bracket for married
          {federalTotal = federalTotalDeducted * 0.10;}
        else if(total >= 18651 && total <= 75900)
          {federalTotal = (federalTotalDeducted - 18650) * 0.15 + 1865;}
        else if(total >= 75901 && total <= 153100)
          {federalTotal = (federalTotalDeducted - 75900) * 0.25 + 10452.50;}
        else if(total >= 153101 && total <= 233350)
          {federalTotal = (federalTotalDeducted - 153100) * 0.28 + 29752.50;}
        else if(total >= 233351 && total <= 416700)
          {federalTotal = (federalTotalDeducted - 233350) * 0.33 + 52222.50;}
        else if(total >= 416701 && total <= 470700)
          {federalTotal = (federalTotalDeducted - 416700) * 0.35 + 112728;}
        else
          {federalTotal = (federalTotalDeducted - 470700) * 0.396 + 131628;}
          
        
          
        if(total <= 20000)//State tax bracket for married
          {stateTotal = total * 0.014;}
        else if(total >= 20001 && total <= 50000)
          {stateTotal = total * 0.0175 - 70;}
        else if(total >= 50001 && total <= 70000)
          {stateTotal = total * 0.0245 - 420.00;}
        else if(total >= 70001 && total <= 80000)
          {stateTotal = total * 0.035 - 1154.50;}
        else if(total >= 80001 && total <= 150000)
          {stateTotal = total * 0.05525 - 2775.00;}
        else if(total >= 150001 && total <= 500000)
          {stateTotal = total * 0.0637 - 4042.50;}
        else
          {stateTotal = total * 0.0897 - 17042.50;}
          
        federalTotal = +((federalTotal).toFixed(2));//Setting all the variables to 2 decimal places
        stateTotal = +((stateTotal).toFixed(2));
        medicareTotal = +((medicareTotal).toFixed(2));
        socialSecurityTotal = +((socialSecurityTotal).toFixed(2));
        
        totalAfterTaxes = total - socialSecurityTotal - medicareTotal - stateTotal - federalTotal;//Calculating total after taxes
      }
      if(stat == "single")//Checking if single
      {
        socialSecurityTotal = total * 0.062;
        if(socialSecurityTotal > 7968)
        {
          socialSecurityTotal =7968;
        }
        if(total > 200000)
        {
          medicareTotal = total * 0.0145 + (total - 200000) * 0.009;
        }
        else
        {
          medicareTotal = total * 0.0145;
        }
        
        federalTotalDeducted = total - 6350;//Taking the federal standard deduction out of the total for single
        
        if(total <= 9325)//Federal tax bracket for single
          {federalTotal = federalTotalDeducted * 0.10;}
        else if(total >= 9326 && total <= 37950)
          {federalTotal = (federalTotalDeducted - 9325) * 0.15 + 932.50;}
        else if(total >= 37951 && total <= 91900)
          {federalTotal = (federalTotalDeducted - 37950) * 0.25 + 5226.25;}
        else if(total >= 91901 && total <= 191650)
          {federalTotal = (federalTotalDeducted - 91900) * 0.28 + 18713.75;}
        else if(total >= 191651 && total <= 416700)
          {federalTotal = (federalTotalDeducted - 191650) * 0.33 + 46643.75;}
        else if(total >= 416701 && total <= 418400)
          {federalTotal = (federalTotalDeducted - 416700) * 0.35 + 120910.25;}
        else
          {federalTotal = (federalTotalDeducted - 418400) * 0.396 + 121505.25;}

        if(total <= 20000)//State tax bracket for single
          {stateTotal = total * 0.014;}
        else if(total >= 20001 && total <= 35000)
          {stateTotal = total * 0.0175 - 70;}
        else if(total >= 35001 && total <= 40000)
          {stateTotal = total * 0.035 - 682.50;}
        else if(total >= 40001 && total <= 75000)
          {stateTotal = total * 0.05525 - 1492.50;}
        else if(total >= 75001 && total <= 500000)
          {stateTotal = total * 0.0637 - 2126.25;}
        else
          {stateTotal = total * 0.0897 - 15126.25;}
          
        federalTotal = +((federalTotal).toFixed(2));//Setting all variable values to 2 decimal places
        stateTotal = +((stateTotal).toFixed(2));
        medicareTotal = +((medicareTotal).toFixed(2));
        socialSecurityTotal = +((socialSecurityTotal).toFixed(2));
        
        totalAfterTaxes = total - socialSecurityTotal - medicareTotal - stateTotal - federalTotal;
     }
  this.response.speak("Using your annual income of $" + total +  " before taxes, you make a total of $" + totalAfterTaxes + " after taxes. " + "$"   
                      + socialSecurityTotal + " gets taken out for social security, $" + medicareTotal + " gets taken out for medicare, $" +
                      federalTotal + " gets taken out for federal income tax, and $" + stateTotal + " gets taken out for state income tax. "
                      + "What amount of money would you like to save").listen("What amount of money would you like to save") //Will give the user all their income information
  this.emit(':responseReady');
  },
  
  'savings': function () {
      saved = this.event.request.intent.slots.amount.value;//Getting the amount they want saved
      this.response.speak("How many weeks would you like to save this amount in").listen("How many weeks would you like to save this amount in");
      this.emit(':responseReady');
  },
  'time': function () {
      weeks = this.event.request.intent.slots.weeks.value;//Getting the amount of weeks they want to save the amount in
      savePerCheck = (saved / (weeks / 2));//Calculating to get the amount they need to save per pay check
      savePerCheck = +((savePerCheck).toFixed(2));//Setting the savePerCheck value to 2 decimal places
      this.response.speak("If you want to save $" + saved + " over " + weeks + " weeks, then you will have to save $"
                          + savePerCheck + " per paycheck you recieve(Biweekly). "
                          + "Thanks for using the income/savings calculator");//Telling the user how much they need to save and thanking them for using the program
      this.emit(':responseReady');
  },
};



// This is the function that AWS Lambda calls every time Alexa uses your skill.
exports.handler = function(event, context, callback) {
  // Include the AWS Alexa Library.
  const Alexa = require("alexa-sdk");

  // Create an instance of the Alexa library and pass it the requested command.
  var alexa = Alexa.handler(event, context);

  // Give our Alexa instance instructions for handling commands and execute the request.
  alexa.registerHandlers(handlers);
  alexa.execute();
};
