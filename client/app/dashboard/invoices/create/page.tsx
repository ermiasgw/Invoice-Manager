import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bird, PlusCircle, Rabbit, Trash, Turtle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function CreateInvoice() {
  return (
    <main className="grid p-10">
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 pb-5">
    <Card >
      <CardHeader>
        <CardTitle>Invoice</CardTitle>
        <CardDescription>
          Main Invoice data
        </CardDescription>
      </CardHeader>
      <CardContent>
      <div className="grid gap-3">
        <Label htmlFor="model">Client</Label>
        <Select>
          <SelectTrigger
            id="model"
            className="items-start [&_[data-description]]:hidden"
          >
            <SelectValue placeholder="Select a client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="genesis">
              <div className="flex items-start gap-3 text-muted-foreground">
                <Rabbit className="size-5" />
                <div className="grid gap-0.5">
                  <p>
                    Neural{" "}
                    <span className="font-medium text-foreground">
                      Genesis
                    </span>
                  </p>
                  <p className="text-xs" data-description>
                    Our fastest model for general use cases.
                  </p>
                </div>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3 mt-4">
        <Label htmlFor="statys">Status</Label>
        <Input id="status" type="string" placeholder="0.4" />
      </div>
      <div className="grid gap-3 mt-4">
        <Label htmlFor="currency">Currency</Label>
        <Input id="currency" type="string" placeholder="Birr" />
      </div>
      <div className="grid gap-3 mt-4">
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" />
      </div>
      </CardContent>
    </Card>
  <Card >
      <CardHeader>
        <CardTitle>Products or Services</CardTitle>
        <CardDescription>
          Add Products or Services that you provided
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[150px]">Type</TableHead>
              <TableHead className="w-[150px]">Price</TableHead>
              <TableHead className="w-[20px]"></TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold">
                <Label htmlFor="price-1" className="sr-only">
                    Price
                  </Label>
                  <Input
                    id="price-1"
                    type="string"
                    defaultValue="99.99"
                  />             
               </TableCell>
              <TableCell>
                <Label htmlFor="stock-1" className="sr-only">
                  Stock
                </Label>
                <Input
                  id="stock-1"
                  type="text"
                  defaultValue="100"
                />
              </TableCell>
              <TableCell>
                <Label htmlFor="price-1" className="sr-only">
                  Price
                </Label>
                <Input
                  id="price-1"
                  type="string"
                  defaultValue="99.99"
                />
              </TableCell>
              <TableCell>
                <Label htmlFor="price-1" className="sr-only">
                    Price
                  </Label>
                  <Input
                    id="price-1"
                    type="number"
                    defaultValue="99.99"
                  />
              </TableCell>
              <TableCell>
                <Trash />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button size="sm" variant="ghost" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          Add Variant
        </Button>
      </CardFooter>
    </Card>

    <Button>Submit</Button>
    </div>
  </main>
  )
}