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
import React, { Dispatch, SetStateAction } from 'react';

const ProductsForm: React.FC<{id: number,products: number[], setProducts:  Dispatch<SetStateAction<number[]>> }> = (props) => {
  console.log(props.id)
  return (
    <>
    <TableRow>
        <TableCell className="font-semibold">
        <Label htmlFor={`name-${props.id}`} className="sr-only">
            Name
            </Label>
            <Input
            id={`name-${props.id}`}
            type="string"
            name={`name-${props.id}`}
            />             
        </TableCell>
        <TableCell>
        <Label htmlFor="description-1" className="sr-only">
            Description
        </Label>
        <Input
            id="description-1"
            type="text"
            defaultValue="100"
        />
        </TableCell>
        <TableCell>
        <Label htmlFor="type-1" className="sr-only">
            Type
        </Label>
        <Input
            id="type-1"
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
        <Button onClick={() => props.setProducts(props.products.filter(num => num !== props.id))} variant={"link"}><Trash /></Button>
        </TableCell>
    </TableRow>
    </>
  );
};

export default ProductsForm;