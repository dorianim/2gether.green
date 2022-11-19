import { Scatter } from "react-chartjs-2";
import { Chart as ChartReg, registerables, TooltipItem } from 'chart.js';
ChartReg.register(...registerables);


// const sample_data =  {
//     payoffMonth: 100,
//     finishBuilding: 15,
// }

interface ChartProps {
    payOffMonth: number;
    cost_per_month: number;
    profit_per_month: number;
    construction_time: number;
}



export const CostChart = (props: ChartProps) => {
    const endOfChart = props.payOffMonth + 100;
    function calculatePayoffPoint(month: number) {
        return (((-1)*props.cost_per_month)* month);
    }

    function calculateAfterFinishBuilding(month: number) {
        let ypoint = calculatePayoffPoint(props.construction_time);
        let k = (-1)*(props.cost_per_month - props.profit_per_month);
        let d = ypoint / (k * props.profit_per_month);
        return (k * month) + d;
    }

    function calculatePureProfit(month: number) {
        let k = props.profit_per_month;
        let d = 0 - (k * props.construction_time);
        return (k * month) + d;
    }

    function calculateRealProfit(month: number) {
        let k = props.profit_per_month;
        let d = calculateAfterFinishBuilding(props.payOffMonth) - (k * props.payOffMonth);
        return (k * month) + d;
    }


    return (
        <Scatter
            width={1000}
            height={600}
            data={{
                datasets: [
                    {
                        label: "Payoff",
                        data: [
                            {x: 0, y: 0},
                            {x: 0, y: calculateAfterFinishBuilding(0)},
                            {x: props.construction_time, y: calculatePayoffPoint(props.construction_time)},
                            {x: props.payOffMonth, y: calculatePayoffPoint(props.payOffMonth)},
                        ],
                        showLine: true,
                        hidden: true
                    },
                    {
                        label: "Balance Function",
                        data: [
                            {x: 0, y: 0},
                            {x: props.construction_time, y: calculatePayoffPoint(props.construction_time)},
                            {x: props.payOffMonth, y: calculateAfterFinishBuilding(props.payOffMonth)},
                            {x: props.payOffMonth + Math.abs(calculateAfterFinishBuilding(props.payOffMonth)/props.profit_per_month), y: 0},
                            {x: endOfChart, y: calculateRealProfit(endOfChart)},
                        ],
                        showLine: true
                    },
                    {   
                        label: "Profit",
                        data: [
                            {x: 0, y: 0},
                            {x: props.construction_time, y: calculatePureProfit(props.construction_time)},
                            {x: props.payOffMonth, y: calculatePureProfit(props.payOffMonth)},
                            {x: endOfChart, y: calculatePureProfit(endOfChart)}
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
