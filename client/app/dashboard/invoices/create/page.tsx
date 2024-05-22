'use client'
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
import ProductsForm from "@/components/productsForm"
import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { createInvoice } from "@/app/actions/invoice"

export default function CreateInvoice() {
  const [fields, setFields] = useState<{ id: number; name: string; desc: string; type: string; price: string; }[]>([{ id: 1, name: '', desc: '', type: '', price: "" }])
  const [state, action] = useFormState<any, any>(createInvoice, undefined)
  console.log(state?.errors)
  function Submit() {
    const status = useFormStatus();
    return <Button type="submit" aria-disabled={status.pending} className="w-full">
    {status.pending ? 'Submitting...' : 'Submit'}
    </Button>
  }

  const addField = () => {
    const newField = { id: fields.length !== 0 ? calculateMaxId()+1 : 1, name: '', desc: '', type: '', price: "" };
    setFields([...fields, newField]);
  };

  const calculateMaxId = () => {
    const ids = fields.map(field => field.id);
    return Math.max(...ids);
  };

  // Function to remove a field
  const removeField = (idToRemove: number) => {
    const updatedFields = fields.filter(field => field.id !== idToRemove);
    setFields(updatedFields);
  };

  // Function to handle field value change
  const handleFieldChange = ({id, name, desc, type, price}: {id: number, name?: string, desc?: string, type?: string, price?: string}) => {
    const updatedFields = fields.map(field => {
      if (field.id === id) {
        return {
          ...field,
          name: name === undefined ? field.name : name,
          desc: desc === undefined ? field.desc : desc,
          type: type === undefined ? field.type : type,
          price: price === undefined ? field.price : price,
        }
      }
      return field;
    });
    setFields(updatedFields);
  };


  return (
    <main className="grid p-10">
      <form action={action}>
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
        <Label htmlFor="client">Client</Label>
        <Select name="client">
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
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="string" name="status" placeholder="0.4" />
      </div>
      <div className="grid gap-3 mt-4">
        <Label htmlFor="currency">Currency</Label>
        <Input id="currency" type="string" name="currency" placeholder="Birr" />
      </div>
      <div className="grid gap-3 mt-4">
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="datetime-local" name="date" />
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
          {fields.map((field, index) => (
              <TableRow key={index}>
              <TableCell className="font-semibold">
                  <Input
                  id={`name_${field.id}`}
                  type="string"
                  value={field.name}
                  name={`name_${field.id}`}
                  onChange={(e) => handleFieldChange({id:field.id, name: e.target.value})}
                  placeholder="Name"
                  />             
              </TableCell>
              <TableCell>
              <Input
                  id={`description_${field.id}`}
                  type="string"
                  value={field.desc}
                  name={`description_${field.id}`}
                  onChange={(e) => handleFieldChange({id:field.id, desc: e.target.value})}
                  placeholder="Description"
              />
              </TableCell>
              <TableCell>
              <Input
                  id={`type_${field.id}`}
                  type="string"
                  value={field.type}
                  name={`type_${field.id}`}
                  onChange={(e) => handleFieldChange({id:field.id, type: e.target.value})}
                  placeholder="Type"
              />
              </TableCell>
              <TableCell>
                  <Input
                  type="number"
                  id={`price_${field.id}`}
                  value={field.price}
                  name={`price_${field.id}`}
                  onChange={(e) => handleFieldChange({id:field.id, price: e.target.value})}
                  placeholder="Price"
                  />
              </TableCell>
              <TableCell>
              <Button onClick={() => removeField(field.id)} variant={"link"}><Trash /></Button>
              </TableCell>
          </TableRow>
          ))}
            
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button size="sm" variant="ghost" className="gap-1" onClick={addField}>
          <PlusCircle className="h-3.5 w-3.5" />
          Add Variant
        </Button>
      </CardFooter>
    </Card>

    <Submit />
    
    </div>
    <input hidden type="string" name="ids" value={fields.map(field => field.id).join(',')} id="" />
    
    </form>
    
  </main>
  )
}