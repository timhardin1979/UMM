import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ModernMortgageDashboard() {
  const [loanAmount, setLoanAmount] = useState(0);
  const [points, setPoints] = useState(0);
  const commission = (loanAmount * (points / 100)).toFixed(2);

  const [leads, setLeads] = useState([
    { name: "John Doe", status: "New", loanAmount: 400000 },
    { name: "Jane Smith", status: "Pre-Approved", loanAmount: 525000 },
    { name: "Sam Johnson", status: "In Process", loanAmount: 610000 },
  ]);

  const dealsChartData = [
    { month: "Jan", deals: 3 },
    { month: "Feb", deals: 5 },
    { month: "Mar", deals: 4 },
    { month: "Apr", deals: 6 },
    { month: "May", deals: 7 },
    { month: "Jun", deals: 4 },
  ];

  const [newLead, setNewLead] = useState({ name: "", status: "New", loanAmount: 0 });

  const handleAddLead = () => {
    if (newLead.name && newLead.loanAmount) {
      setLeads([...leads, newLead]);
      setNewLead({ name: "", status: "New", loanAmount: 0 });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white p-8">
      <div className="flex justify-center items-center flex-col mb-6">
        <Image
          src="/IMG_3963.jpeg"
          alt="United Modern Mortgage Logo"
          width={250}
          height={100}
          className="mb-4"
        />
        <h1 className="text-5xl font-bold text-center">United Modern Mortgage</h1>
        <p className="text-sm mt-2">NMLS #2414401</p>
      </div>

      <Tabs defaultValue="dashboard" className="max-w-6xl mx-auto">
        <TabsList className="flex justify-center gap-4 mb-8 bg-gray-800 p-2 rounded-xl">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="commission">Commission Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <Card className="bg-gray-800 mb-6">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Monthly Deals</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dealsChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                  <XAxis dataKey="month" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Line type="monotone" dataKey="deals" stroke="#8b5cf6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads">
          <Card className="bg-gray-800">
            <CardContent className="p-6 space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Current Leads</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {leads.map((lead, i) => (
                  <div key={i} className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-lg font-medium">{lead.name}</p>
                    <p>Status: {lead.status}</p>
                    <p>Loan Amount: ${lead.loanAmount.toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Add New Lead</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input
                    placeholder="Name"
                    value={newLead.name}
                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  />
                  <Input
                    placeholder="Loan Amount"
                    type="number"
                    value={newLead.loanAmount}
                    onChange={(e) => setNewLead({ ...newLead, loanAmount: Number(e.target.value) })}
                  />
                  <Input
                    placeholder="Status"
                    value={newLead.status}
                    onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
                  />
                  <Button onClick={handleAddLead}>Add Lead</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commission">
          <Card className="bg-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Commission Calculator</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <Input
                  placeholder="Loan Amount ($)"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                />
                <Input
                  placeholder="Points (%)"
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(Number(e.target.value))}
                />
                <div className="text-xl font-bold">Commission: ${commission}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
