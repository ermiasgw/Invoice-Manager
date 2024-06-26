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
import { useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { createInvoice } from "@/app/actions/invoice"
import useSWR from "swr"

export default function UpdateInvoice({ params }: {params: any}) {
  const id = params.id
  const [fields, setFields] = useState<{ id: number; name: string; desc: string; type: string; price: string; }[]>(
    [{ id: 1, name: '', desc: '', type: '', price: "" }])

  const [total, setTotal] = useState(0)


  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: invoice, error: invoiceError } = useSWR(`/api/invoice/${id}`, fetcher)
  

  useEffect(() => {
    let defaultProducts: (() => { id: number; name: string; desc: string; type: string; price: string }[]) | { id: any; name: any; desc: any; type: any; price: any }[] = []
    if (invoice && invoice.offerings) {
      invoice.offerings.map((value: any, index: any) => {
        defaultProducts.push({
          id: index,
          name: value.name,
          desc: value.description,
          type: value.type,
          price: value.price
        })
      })
    }
    if (defaultProducts.length !==0 ){
      setFields(defaultProducts)
    }
  }, [invoice]);

  useEffect(() => {
    let sum = 0

    fields.map((value) => {
      if (value?.price && parseFloat(value?.price)) {
        sum = sum + parseFloat(value?.price)
      }
    })

    setTotal(sum)
  }, [fields])

  const [state, action] = useFormState<any, any>(createInvoice, undefined)
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
  function convertIsoToCustomFormat(isoString: any) {
    const date = new Date(isoString);
  
    // Pad function to ensure two digits
    const pad = (number: any) => number.toString().padStart(2, '0');
  
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Months are 0-based
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }


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
                <div className="font-medium">Liam Johnson</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      liam@example.com
                  </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3 mt-4">
        <Label htmlFor="status">Status</Label>
        <Input id="status" type="string" name="status" value="" hidden />
      </div>
      <div className="grid gap-3 mt-4">
        <Label htmlFor="currency">Currency</Label>
        <Input id="currency" type="string" name="currency" value="Birr" hidden />
      </div>
      <div className="grid gap-3 mt-4">
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="datetime-local" defaultValue={invoice? convertIsoToCustomFormat(invoice.dueDate): ""}  name="date"/>
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
                  required
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
                  value="Product"
                  name={`type_${field.id}`}
                  onChange={(e) => handleFieldChange({id:field.id, type: e.target.value})}
                  placeholder="Type"
                  hidden
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
                  required
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
        <Button size="sm" variant="ghost" className="gap-1 mr-24" onClick={addField}>
          <PlusCircle className="h-3.5 w-3.5" />
          Add Variant
        </Button>

        <div className="float-right ">total: <span>{total} Birr</span></div>
      </CardFooter>
    </Card>

    {state?.errors && <p>{JSON.stringify(state?.errors)}</p>}
    {state?.messages && <p>{JSON.stringify(state?.messages)}</p>}

    <Submit />
    
    </div>
    <input hidden type="string" name="ids" value={fields.map(field => field.id).join(',')} id="" />
    
    </form>
    
  </main>
  )
}