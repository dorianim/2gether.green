import { Scatter } from "react-chartjs-2";
import { Chart as ChartReg, registerables, TooltipItem } from 'chart.js';
ChartReg.register(...registerables);


const sample_data =  {
    payoffMonth: 100,
    finishBuilding: 15,
    endOfChart: 300
}

export const Chart = () => {
    const fee_per_month = 200;
    const profit_per_month = 100;

    function calculatePayoffPoint(month: number) {
        return (((-1)*fee_per_month)* month);
    }

    function calculateAfterFinishBuilding(month: number) {
        let ypoint = calculatePayoffPoint(sample_data.finishBuilding);
        let k = (-1)*(fee_per_month - profit_per_month);
        let d = ypoint / (k * sample_data.finishBuilding);
        return (k * month) + d;
    }

    function calculatePureProfit(month: number) {
        let k = profit_per_month;
        let d = 0 - (k * sample_data.finishBuilding);
        return (k * month) + d;
    }

    function calculateRealProfit(month: number) {
        let k = profit_per_month;
        let d = calculateAfterFinishBuilding(sample_data.payoffMonth) - (k * sample_data.payoffMonth);
        return (k * month) + d;
    }


    return (
        <Scatter
            width={500}
            height={300}
            data={{
                datasets: [
                    {
                        label: "Payoff",
                        data: [
                            {x: 0, y: 0},
                            {x: 0, y: calculateAfterFinishBuilding(0)},
                            {x: sample_data.finishBuilding, y: calculatePayoffPoint(sample_data.finishBuilding)},
                            {x: sample_data.payoffMonth, y: calculatePayoffPoint(sample_data.payoffMonth)},
                        ],
                        showLine: true,
                        hidden: true
                    },
                    {
                        label: "Balance Function",
                        data: [
                            {x: 0, y: 0},
                            {x: sample_data.finishBuilding, y: calculatePayoffPoint(sample_data.finishBuilding)},
                            {x: sample_data.payoffMonth, y: calculateAfterFinishBuilding(sample_data.payoffMonth)},
                            {x: sample_data.payoffMonth + Math.abs(calculateAfterFinishBuilding(sample_data.payoffMonth)/profit_per_month), y: 0},
                            {x: sample_data.endOfChart, y: calculateRealProfit(sample_data.endOfChart)},
                        ],
                        showLine: true
                    },
                    {   
                        label: "Profit",
                        data: [
                            {x: 0, y: 0},
                            {x: sample_data.finishBuilding, y: calculatePureProfit(sample_data.finishBuilding)},
                            {x: sample_data.payoffMonth, y: calculatePureProfit(sample_data.payoffMonth)},
                            {x: sample_data.endOfChart, y: calculatePureProfit(sample_data.endOfChart)}
                        ],
                        showLine:true,
                        hidden: true
                    },
                ]
            }}
            options={{
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context: TooltipItem<"scatter">) {
                                let val = context.formattedValue;
                                return "After " + context.formattedValue.substring(val.indexOf("(")+1, val.indexOf(",")) + " months: " + context.formattedValue.substring(val.indexOf(",") + 1, val.length - 1) + "€";
                            }
                        }
                    }
                }
            }}
        />
    );
}
