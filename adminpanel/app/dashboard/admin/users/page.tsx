"use client";
import React, { useEffect, useState } from "react";
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, LayoutDashboard, Loader, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { supabase } from "@/utils/something/supabase/supabaseClient";
import Breadcumb from "@/components/dashboard/Breadcumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import moment from "moment";
import { AxiosInstance } from "@/utils/config";
import IndicatorGreen from "@/components/dashboard/indicators/indicator-green";
import IndicatorRed from "@/components/dashboard/indicators/indicator-red";
import ViewUserSheet from "./(components)/ViewUserSheet";
import IndicatorYellow from "@/components/dashboard/indicators/indicator-yellow";
import IndicatorPurple from "@/components/dashboard/indicators/indicator-purple";
import IndicatorBlue from "@/components/dashboard/indicators/indicator-blue";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Pagination } from "flowbite-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type PaginationState = {
  pageIndex: number
  pageSize: number
}
export default function Page() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [refreshNow, setRefreshNow] = useState(false);
  const [users, setUsers] = React.useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");


  React.useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await AxiosInstance.get(`/users/all`)
        console.log(data);
        setUsers(data?.data || []);
        setRefreshNow(false);
        
        setIsFetching(false);
      } catch (error: any) {
        console.log(error.message);
        setIsFetching(false);
      }
    };
    fetch();
  }, [refreshNow]);

  const [deletingId, setDeletingId] = useState<string>();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const deleteCatgory = async (id: string) => {
    setDeletingId(id);
    setIsDeleting(true)
    try {
      const { data } = await AxiosInstance.delete(`/users/${id}`);
      toast.success("User deleted successfully");
      setRefreshNow(true);
      setIsDeleting(false);
    } catch (error: any) {
      toast.error(error.message);
      setIsFetching(false);
      setIsDeleting(false);
      return;
    }
  };

  const updateRole=async(userId:any,newRole:any)=>{
    try {
      console.log(userId);
      console.log(newRole)
      const { data } = await AxiosInstance.patch(`users/${userId}`, { role: newRole});
     setRefreshNow(true)
      console.log(data);
    } catch (error:any) {
      console.log(error.message)
    }
  }
  const [currentPage, setCurrentPage] = useState(0);

  const onPageChange = (page: number) =>{ 
  
    setCurrentPage(page);
    table.setPageIndex(page);
   
  };
  
 
  const columns: ColumnDef<any>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

  
    {
      accessorKey: "S.N.",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            S.N.
            
          </Button>
        );
      },
      cell: ({ row }) => <div>{parseInt(row.id)+1}</div>,
    },

    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Email
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
   
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => {
        let selectedRole:any = (row.getValue('role'));
  
        const handleRoleChange = (newRole:any) => {
        
          // Assuming you have a function to update the role in the backend
          updateRole(row.original.userId, newRole);
        };
  
        return (
          <div className="w-[180px]">
            <Select value={selectedRole} onValueChange={handleRoleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="porter">Porter</SelectItem>
                <SelectItem value="cook">Cook</SelectItem>
                <SelectItem value="expedition-guide">Expedition Guide</SelectItem>
                <SelectItem value="trekking-guide">Trekking Guide</SelectItem>
             
              </SelectContent>
            </Select>
          </div>
        );
      },
    },



    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                {deletingId === item.userId && isDeleting ? <Loader className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <ViewUserSheet
                id={item.userId}
                setRefreshNow={setRefreshNow}
              />

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <span className=" flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-red-500/90"> Delete User</span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone. This will permanently delete your data and remove your data from our servers.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className=" bg-red-500/90 hover:bg-red-500"
                      onClick={() => deleteCatgory(item.userId)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];




  const table = useReactTable({
    data: users || [],

    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
     
    },
  });

  const links = [
    { href: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/admin/users", label: "Users", isActive: true },
  ];

 

  return (
    <div className="w-full">
      <Breadcumb links={links} />

      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between py-4">
        <Input
          placeholder="Filter by email..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
          className="max-w-sm "
        />

        <div className=" flex items-center gap-4">
          {/* <Link href="/dashboard/admin/users/groups">
            <Button variant={"secondary"}>Groups</Button>
          </Link> */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex overflow-x-auto sm:justify-center">
        <div className="flex items-center gap-2">
        <Button
       
         variant="outline"
         size="sm"
         
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
         <ChevronsLeft  size={20}/>
        </Button>
        <Button
             variant="outline"
             size="sm"
             
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft size={20}/>
        </Button>
        <Button
               variant="outline"
               size="sm"
               
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
         <ChevronRight size={20} />
        </Button>
        <Button
             variant="outline"
             size="sm"
             
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
        <ChevronsRight size={20}/>
        </Button>
        <span className="flex items-center gap-1">
          <div className="text-muted-foreground">Page</div>
          <div>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </div>
        </span>
        <span className="flex items-center gap-1 text-muted-foreground">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              console.log(table.getPageCount())
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              console.log(page)
             page<Number(table.getPageCount()) &&  table.setPageIndex(page)
            }}
            className=" p-1 rounded w-16 text-black dark:text-black  "
          />
        </span>
        
      </div>
    </div>
       
      </div>
    </div>
  );
}

