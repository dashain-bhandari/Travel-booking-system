"use client";
import React, { useState } from "react";
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";

import { ArrowUpDown,ArrowRightIcon, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, LayoutDashboard, Loader, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import Breadcumb from "@/components/dashboard/Breadcumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CaretSortIcon } from "@radix-ui/react-icons";
import ActivityCreateSheet from "./(components)/CreateActivitySheet";
import ActivityEditSheet from "./(components)/EditActivitySheet";
import Link from "next/link";
import { useImageDeleteFromCloudinary } from "@/hooks/useImageDeleteFromCloudinary";
import { AxiosInstance } from "@/utils/config";

export default function Page() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { deleteImageFromCloudinary, deleteStatus } = useImageDeleteFromCloudinary();

  const [refreshNow, setRefreshNow] = useState(false);
  const [activities, setActivities] = React.useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  // Fetch all collections
  React.useEffect(() => {
    const fetch = async () => {
      try {
        let { data } = await AxiosInstance.get("activities");
      let sortedData:any[]=[]
        sortedData = data?.data && data?.data?.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) || [];
        console.log(sortedData);
        setActivities(data?.data || []);
        setRefreshNow(false);
        setIsFetching(false);
      } catch (error: any) {
        console.log(error.message);
        setIsFetching(false);
      }
    };
    fetch();
  }, [refreshNow]);

  // Handle delete
  const [deletingId, setDeletingId] = useState<string>();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  
  const deleteCatgory = async (id: string) => {
    setDeletingId(id);
    setIsDeleting(true);

    try {
      console.log(id);
      const res = await AxiosInstance.get(`activities/${id}`);
      const { data } = await AxiosInstance.delete(`activities/${id}`);
      const resp = await deleteImageFromCloudinary(res?.data?.data?.image);
      toast.success("Activity deleted successfully");
      setRefreshNow(true);
      setIsDeleting(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message||error.message);
      setIsFetching(false);
      setIsDeleting(false);
      return;
    }
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
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },

    {
      accessorKey: "slug",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Slug
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("slug")}</div>,
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
                {deletingId === item.activityId && isDeleting ? <Loader className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <ActivityEditSheet
                id={item.activityId}
                setRefreshNow={setRefreshNow}
              />

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <span className=" flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-red-500/90"> Delete Activity</span>
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
                      onClick={() => deleteCatgory(item.activityId)}>
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
    data: activities || [],
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
    { href: "/dashboard/admin/activities", label: "Activities", isActive: true },
  ];

  const [isMultipleDeleting, setIsMultipleDeleting] = useState(false)
  const deleteMultipleData = async () => {
      setIsMultipleDeleting(true)
      const datas = table.getSelectedRowModel().rows
      console.log(datas);
      const arrs = datas?.map((item: any, idx: any) => {
          return item?.original?.activityId
      })
      console.log(arrs)
      try {
          const { data } = await AxiosInstance.post("activities/multiple-delete", { id: arrs })
          setRefreshNow(true)
          setIsMultipleDeleting(false)
          toast.success("Delete success");
          table.setRowSelection({})
      } catch (error: any) {
          console.log(error.message);
          toast.error("Something went wrong.")
          setIsMultipleDeleting(false)
      }
  }

  
  return (
    <div className="w-full">
      <Breadcumb links={links} />

      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between py-4">
        <Input
          placeholder="Filter by activity name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm "
        />
        <div className=" flex items-center gap-4">
          <ActivityCreateSheet
            activities={activities}
            setRefreshNow={setRefreshNow}
          />
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
          <AlertDialog>
                <AlertDialogTrigger asChild>
                {table.getFilteredSelectedRowModel().rows.length>0 && <Button className="border border-black border-1 text-white bg-red-700 ml-2 hover:bg-red-800" >
                    {isMultipleDeleting ? <Loader className="h-4 w-4 animate-spin" />: "Delete all"}
                       
                        </Button>  }
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
                      onClick={deleteMultipleData}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
    </div>
  );
}
