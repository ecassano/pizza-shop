import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, XAxis, YAxis, Line, CartesianGrid } from "recharts";
import colors from "tailwindcss/colors";

const data = [
  { date: '10/11', revenue: 1200 },
  { date: '11/11', revenue: 800 },
  { date: '12/11', revenue: 900 },
  { date: '13/11', revenue: 400 },
  { date: '14/11', revenue: 2300 },
  { date: '15/11', revenue: 800 },
  { date: '16/11', revenue: 640 },
]

const RevenueChart = () => {
  return (
    <Card className="col-span-6 bg-transparent">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">Receita no período</CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              dy={16}
            />
            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={80}
              tickFormatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            />
            <Line
              type="linear"
              strokeWidth={2}
              dataKey="revenue"
              stroke={colors['violet']['400']}
            />
            <CartesianGrid className="stroke-muted" vertical={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default RevenueChart