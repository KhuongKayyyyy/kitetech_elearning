"use client";

import React, { useId, useMemo, useRef, useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditStudentScoreDialog } from "./EditStudentScoreDialog";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Columns3,
  Edit,
  Search,
} from "lucide-react";
import { classService } from "@/app/data/services/classService";
import { toast } from "sonner";

// Type definitions for the service dataex
export interface GradeData {
  id: number;
  classroomId: number;
  userId: number;
  qt1Grade: string;
  qt2Grade: string;
  midtermGrade: string;
  finalGrade: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    username: string;
    full_name: string;
    email: string;
  };
}

export interface StudentScore {
  id: number;
  studentName: string;
  studentId: string;
  userId: number;
  email: string;
  qt1: number | null;
  qt2: number | null;
  midterm: number | null;
  finalTerm: number | null;
  average: number | null;
}

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<StudentScore> = (row, filterValue) => {
  const searchableRowContent =
    `${row.original.studentName} ${row.original.studentId}`.toLowerCase();
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

const ScoreCell = ({ value }: { value: number | null }) => {
  if (value === null) {
    return <span className='text-muted-foreground'>-</span>;
  }

  let colorClass = "";
  if (value >= 90) colorClass = "text-emerald-600 font-semibold";
  else if (value >= 80) colorClass = "text-blue-600 font-medium";
  else if (value >= 70) colorClass = "text-yellow-600 font-medium";
  else if (value >= 60) colorClass = "text-orange-600 font-medium";
  else colorClass = "text-red-600 font-semibold";

  return <span className={colorClass}>{value}</span>;
};

interface ClassScoreTableProps {
  courseId: number;
}

export default function ClassScoreTable({ courseId }: ClassScoreTableProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [classGrades, setClassGrades] = useState<GradeData[]>([]);

  const id = useId();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "studentName",
      desc: false,
    },
  ]);

  // Fetch grades data from service
  useEffect(() => {
    const fetchClassGrades = async () => {
      try {
        setIsLoading(true);
        const gradesData = await classService.getClassGrades(
          courseId.toString()
        );
        setClassGrades(gradesData);
      } catch (error) {
        console.error("Failed to fetch class grades:", error);
        setClassGrades([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassGrades();
  }, [courseId]);

  // Transform service data to table format
  const data = useMemo((): StudentScore[] => {
    return classGrades.map((gradeData: GradeData) => {
      const userId = gradeData.userId;
      const qt1 = gradeData.qt1Grade ? parseFloat(gradeData.qt1Grade) : null;
      const qt2 = gradeData.qt2Grade ? parseFloat(gradeData.qt2Grade) : null;
      const midterm = gradeData.midtermGrade
        ? parseFloat(gradeData.midtermGrade)
        : null;
      const finalTerm = gradeData.finalGrade
        ? parseFloat(gradeData.finalGrade)
        : null;

      // Calculate average
      const scores = [qt1, qt2, midterm, finalTerm].filter(
        (score): score is number => score !== null
      );
      const average =
        scores.length > 0
          ? scores.reduce((sum, score) => sum + score, 0) / scores.length
          : null;

      return {
        id: gradeData.id,
        userId: userId,
        studentName: gradeData.user.full_name,
        studentId: gradeData.user.username,
        email: gradeData.user.email,
        qt1,
        qt2,
        midterm,
        finalTerm,
        average: average ? Math.round(average * 100) / 100 : null,
      };
    });
  }, [classGrades]);

  const [editingStudent, setEditingStudent] = useState<StudentScore | null>(
    null
  );
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditStudent = (student: StudentScore) => {
    setEditingStudent(student);

    setIsEditDialogOpen(true);
  };

  const handleSaveStudent = async (updatedStudent: StudentScore) => {
    try {
      console.log("updatedStudent", updatedStudent);
      await classService.updateClassGrade(
        courseId.toString(),
        updatedStudent.userId.toString(),
        {
          qt1Grade: updatedStudent.qt1,
          qt2Grade: updatedStudent.qt2,
          midtermGrade: updatedStudent.midterm,
          finalGrade: updatedStudent.finalTerm,
        }
      );

      // Update local state with the new data
      setClassGrades((prevGrades) =>
        prevGrades.map((gradeData) =>
          gradeData.userId === updatedStudent.userId
            ? {
                ...gradeData,
                qt1Grade: updatedStudent.qt1?.toString() || "",
                qt2Grade: updatedStudent.qt2?.toString() || "",
                midtermGrade: updatedStudent.midterm?.toString() || "",
                finalGrade: updatedStudent.finalTerm?.toString() || "",
              }
            : gradeData
        )
      );

      toast.success("Student score updated successfully");
      handleCloseEditDialog();
    } catch (error) {
      console.error("Failed to update student score:", error);
      toast.error("Failed to update student score");
    }
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingStudent(null);
  };

  const columns: ColumnDef<StudentScore>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
          className='translate-y-0.5'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
          className='translate-y-0.5'
        />
      ),
      size: 40,
      enableSorting: false,
      enableHiding: false,
    },
    {
      header: "Student",
      accessorKey: "studentName",
      cell: ({ row }) => (
        <div className='space-y-1'>
          <div className='font-medium text-foreground'>
            {row.original.studentName}
          </div>
          <div className='text-sm text-muted-foreground'>
            {row.original.studentId}
          </div>
        </div>
      ),
      size: 200,
      filterFn: multiColumnFilterFn,
      enableHiding: false,
    },
    {
      header: "QT1",
      accessorKey: "qt1",
      cell: ({ row }) => <ScoreCell value={row.original.qt1} />,
      size: 80,
    },
    {
      header: "QT2",
      accessorKey: "qt2",
      cell: ({ row }) => <ScoreCell value={row.original.qt2} />,
      size: 80,
    },
    {
      header: "Midterm",
      accessorKey: "midterm",
      cell: ({ row }) => <ScoreCell value={row.original.midterm} />,
      size: 100,
    },
    {
      header: "Final Term",
      accessorKey: "finalTerm",
      cell: ({ row }) => <ScoreCell value={row.original.finalTerm} />,
      size: 100,
    },
    {
      header: "Average",
      accessorKey: "average",
      cell: ({ row }) => (
        <div className='font-semibold'>
          <ScoreCell value={row.original.average} />
        </div>
      ),
      size: 80,
    },
    {
      id: "actions",
      header: () => <span className='sr-only'>Actions</span>,
      cell: ({ row }) => <RowActions row={row} onEdit={handleEditStudent} />,
      size: 60,
      enableHiding: false,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  });

  const globalFilterValue = useMemo(() => {
    return (table.getColumn("studentName")?.getFilterValue() ?? "") as string;
  }, [table.getColumn("studentName")?.getFilterValue()]);

  const hasActiveFilters = useMemo(() => {
    return globalFilterValue;
  }, [globalFilterValue]);

  const clearAllFilters = () => {
    table.getColumn("studentName")?.setFilterValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center justify-center h-32'>
          <div className='text-muted-foreground'>Loading class scores...</div>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Search and Filters */}
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
            {/* Search */}
            <div className='relative w-full sm:w-80'>
              <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
              <Input
                ref={inputRef}
                placeholder='Search students...'
                value={globalFilterValue}
                onChange={(event) =>
                  table
                    .getColumn("studentName")
                    ?.setFilterValue(event.target.value)
                }
                className='pl-9'
              />
            </div>

            {/* Column Visibility */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='gap-2'>
                  <Columns3 className='h-4 w-4' />
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-48'>
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className='capitalize'
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }>
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant='ghost'
                onClick={clearAllFilters}
                className='gap-2'>
                Clear filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className='rounded-lg border bg-card'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className='hover:bg-transparent border-b'>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.getSize()}px` }}
                    className='h-12'>
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className={cn(
                          "flex cursor-pointer select-none items-center gap-2 text-sm font-medium",
                          "hover:text-foreground transition-colors"
                        )}
                        onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <ChevronUp className='h-4 w-4' />,
                          desc: <ChevronDown className='h-4 w-4' />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    ) : (
                      <div className='text-sm font-medium'>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className='hover:bg-muted/50 transition-colors'>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='py-4'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-32 text-center'>
                  <div className='flex flex-col items-center gap-2 text-muted-foreground'>
                    <Search className='h-8 w-8' />
                    <p>No students found</p>
                    <p className='text-sm'>
                      Try adjusting your search or filters
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center gap-2'>
          <Label htmlFor={`${id}-pagesize`} className='text-sm'>
            Show
          </Label>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => table.setPageSize(Number(value))}>
            <SelectTrigger id={`${id}-pagesize`} className='w-20'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 25, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className='text-sm text-muted-foreground'>entries</span>
        </div>

        <div className='flex items-center gap-4'>
          <p className='text-sm text-muted-foreground'>
            Showing{" "}
            <span className='font-medium text-foreground'>
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
            </span>{" "}
            to{" "}
            <span className='font-medium text-foreground'>
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}
            </span>{" "}
            of{" "}
            <span className='font-medium text-foreground'>
              {table.getFilteredRowModel().rows.length}
            </span>{" "}
            entries
          </p>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                  className='gap-1'>
                  <ChevronFirst className='h-4 w-4' />
                  First
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}>
                  <ChevronLeft className='h-4 w-4' />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}>
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                  className='gap-1'>
                  Last
                  <ChevronLast className='h-4 w-4' />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Edit Student Score Dialog */}
      <EditStudentScoreDialog
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        student={editingStudent}
        onSave={handleSaveStudent}
      />
    </div>
  );
}

function RowActions({
  row,
  onEdit,
}: {
  row: Row<StudentScore>;
  onEdit: (student: StudentScore) => void;
}) {
  const studentScore = row.original;

  return (
    <Button
      variant='ghost'
      size='sm'
      className='h-8 w-8 p-0'
      onClick={() => onEdit(studentScore)}>
      <Edit className='h-4 w-4' />
      <span className='sr-only'>Edit scores</span>
    </Button>
  );
}

export { ClassScoreTable as Component };
