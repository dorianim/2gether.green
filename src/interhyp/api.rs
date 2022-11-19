use ::serde::{Deserialize, Serialize};

const BASE_URL: &str = "https://www.interhyp.de/customer-generation";

//
// request
//
#[allow(non_snake_case)]
#[derive(Serialize, Debug)]
struct MarketOverview {
    caseDto: CaseDto,
    numberOfResults: u8, //5
}

#[allow(non_snake_case)]
#[derive(Serialize, Debug)]
struct CaseDto {
    estate: Estate,
    venture: Venture,
    calledBy: String, //"zinscheck18"
}

#[derive(Serialize, Debug)]
struct Estate {
    zip: String,
}

#[allow(non_snake_case)]
#[derive(Serialize, Debug)]
struct Venture {
    reason: String,        // "Bau",
    percentageBroker: f32, //3.5,
    percentageNotary: u8,  //2,
    percentageTax: f32,    //3.5,
    costsBuilding: i32,    //":890000,
    shownFunding: ShownFunding,
    brokerCosts: i8, //0,
    notaryCosts: i8, //0,
    transferTax: i8, //0
}

#[derive(Serialize, Debug)]
struct ShownFunding {
    loans: Vec<Loan>,
}

#[allow(non_snake_case)]
#[derive(Serialize, Debug)]
struct Loan {
    amount: i32,         //890000,
    maturity: u8,        //15,
    fullRepayment: bool, //false,
    amortisation: u8,    //10
}

//
// response
//

#[allow(non_snake_case)]
#[derive(Deserialize)]
pub struct MorgageOffer {
    //nominalInterest: 4.34,
    //effectiveInterest: 4.47,
    pub monthlyPayment: f32,
    pub totalLoanDurationMonths: u16,
    //fixedPeriodWanted: 15,
    //loanAmount: 890000.0,
    //paymentLeftAfterFixedPeriod: 0.0,
    //totalPayment: 1061942.52234445,
    //totalInterestPayment: 171942.52234445035,
    //priceBuilding: 0.0,
    //equityCash: 0.0,
    //totalDuration: {
    //    "years": 8,
    //    "months": 4
    //},
    pub bankDetails: BankDetails,
}

#[allow(non_snake_case)]
#[derive(Deserialize)]
pub struct BankDetails {
    pub bankName: String,
}

pub async fn get_morgage_rate(
    reference_id: String,
    zip_code: u32,
    amount: i32,
    amortisation: u8,
) -> Result<Vec<MorgageOffer>, reqwest::Error> {
    let request = MarketOverview {
        caseDto: CaseDto {
            estate: Estate {
                zip: zip_code.to_string(),
            },
            venture: Venture {
                reason: "Bau".to_string(),
                percentageBroker: 3.5,
                percentageNotary: 2,
                percentageTax: 3.5,
                costsBuilding: amount,
                shownFunding: ShownFunding {
                    loans: vec![Loan {
                        amount: amount,
                        maturity: 15,
                        fullRepayment: false,
                        amortisation: amortisation,
                    }],
                },
                brokerCosts: 0,
                notaryCosts: 0,
                transferTax: 0,
            },
            calledBy: reference_id,
        },
        numberOfResults: 5,
    };

    println!("{:#?}", request);

    let response = reqwest::Client::new()
        .post(format!("{BASE_URL}/interest/marketOverview"))
        .json(&request)
        .send()
        .await?
        .error_for_status()?;

    println!("interhyp OK: {}", response.status());

    response.json::<Vec<MorgageOffer>>().await
}
