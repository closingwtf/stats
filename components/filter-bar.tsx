"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Stat } from "@/lib/schemas";
import { LoanTerm, LoanType } from "./mortgage-data-dashboard";

interface FilterBarProps {
  available_states: { name: string; code: string }[];
  stats: Stat[];
  selectedState: string | null;
  setSelectedState: (state: string) => void;
  loanType: LoanType;
  onLoanTypeChange: (type: LoanType) => void;
  loanTerm: LoanTerm;
  onLoanTermChange: (term: LoanTerm) => void;
}

export function FilterBar({
  available_states,
  stats,
  selectedState,
  setSelectedState,
  loanType,
  onLoanTypeChange,
  loanTerm,
  onLoanTermChange,
}: FilterBarProps) {
  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="state">State</Label>
        <Select
          value={selectedState || ""}
          onValueChange={(value) => {
            const state = available_states.find((s) => s.name === value);
            if (state) {
              setSelectedState(state.name);
            }
          }}
        >
          <SelectTrigger id="state">
            <SelectValue placeholder="Select a state" />
          </SelectTrigger>
          <SelectContent>
            {available_states.map((state) => (
              <SelectItem key={state.code} value={state.name}>
                {state.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="loan-type">Loan Type</Label>
        <Select
          value={loanType}
          onValueChange={(value) => onLoanTypeChange(value as LoanType)}
        >
          <SelectTrigger id="loan-type">
            <SelectValue placeholder="Select loan type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Conventional">Conventional</SelectItem>
            <SelectItem value="FHA" disabled>
              FHA
            </SelectItem>
            <SelectItem value="VA" disabled>
              VA
            </SelectItem>
            <SelectItem value="USDA" disabled>
              USDA
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="loan-term">Loan Term (Years)</Label>
        <Select
          value={loanTerm}
          onValueChange={(value) => onLoanTermChange(value as LoanTerm)}
        >
          <SelectTrigger id="loan-term">
            <SelectValue placeholder="Select loan term" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15" disabled>
              15 Years
            </SelectItem>
            <SelectItem value="20" disabled>
              20 Years
            </SelectItem>
            <SelectItem value="30">30 Years</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
}
