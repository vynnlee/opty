'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import supabase from '@/lib/supabaseClient'
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  RowSelectionState,
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Loader2 } from 'lucide-react'
import ToggleGroup from '@/components/ui-custom/togglegroup'
import MultiSelect from '@/components/ui-custom/multiselect'
import { FontAnalyzer } from '@/components/FontAnalyzer'

// Types
interface TableData {
  id: number
  [key: string]: any
}

interface TableSchema {
  table_name: string
  column_name: string
  data_type: string
  is_nullable: string
  column_default: string | null
}

interface Category {
  id: number
  language: string
  category: string
  subcategory: string | null
}

interface License {
  id: number
  license_type: string
  description: string
}

interface Style {
  id: number
  language: string
  style: string
}

interface AnalyzedFile {
  originalFile: File
  actualStoragePath: string
}

const tableNames = [
  'authors',
  'categories',
  'font_authors',
  'font_styles',
  'fonts',
  'licenses',
  'styles',
]

// Predefined schema for fonts table
const fontsSchema: TableSchema[] = [
  {
    table_name: 'fonts',
    column_name: 'id',
    data_type: 'integer',
    is_nullable: 'NO',
    column_default: null,
  },
  {
    table_name: 'fonts',
    column_name: 'name',
    data_type: 'text',
    is_nullable: 'NO',
    column_default: null,
  },
  {
    table_name: 'fonts',
    column_name: 'category_id',
    data_type: 'integer',
    is_nullable: 'NO',
    column_default: null,
  },
  {
    table_name: 'fonts',
    column_name: 'license_id',
    data_type: 'integer',
    is_nullable: 'NO',
    column_default: null,
  },
  {
    table_name: 'fonts',
    column_name: 'storage_url',
    data_type: 'text',
    is_nullable: 'YES',
    column_default: null,
  },
  {
    table_name: 'fonts',
    column_name: 'commentary',
    data_type: 'text',
    is_nullable: 'YES',
    column_default: null,
  },
]

export default function ManageFontsPage() {
  const [tableData, setTableData] = useState<TableData[]>([])
  const [selectedTable, setSelectedTable] = useState('fonts')
  const [schema, setSchema] = useState<TableSchema[]>(fontsSchema)
  const [categories, setCategories] = useState<Category[]>([])
  const [licenses, setLicenses] = useState<License[]>([])
  const [styles, setStyles] = useState<Style[]>([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [analyzedFile, setAnalyzedFile] = useState<AnalyzedFile | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('category', { ascending: true })
        .order('subcategory', { ascending: true })

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch categories',
          variant: 'destructive',
        })
      } else {
        setCategories(data)
      }
    }

    const fetchLicenses = async () => {
      const { data, error } = await supabase
        .from('licenses')
        .select('*')
        .order('license_type', { ascending: true })

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch licenses',
          variant: 'destructive',
        })
      } else {
        setLicenses(data)
      }
    }

    const fetchStyles = async () => {
      const { data, error } = await supabase
        .from('styles')
        .select('*')
        .order('style', { ascending: true })

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch styles',
          variant: 'destructive',
        })
      } else {
        setStyles(data)
      }
    }

    fetchCategories()
    fetchLicenses()
    fetchStyles()
  }, [])

  useEffect(() => {
    fetchTableData(selectedTable)
  }, [selectedTable])

  const fetchTableData = async (tableName: string) => {
    setLoading(true)
    const { data, error } = await supabase.from(tableName).select('*')

    if (error) {
      toast({
        title: 'Error',
        description: `Failed to fetch ${tableName} data`,
        variant: 'destructive',
      })
    } else {
      setTableData(data)
    }
    setLoading(false)
  }

  const columns: ColumnDef<TableData>[] = useMemo(() => {
    if (tableData.length === 0) return []
    return [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
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
      ...Object.keys(tableData[0]).map((key) => ({
        accessorKey: key,
        header: key,
        cell: ({ row }) => {
          const value = row.getValue(key)
          return (
            <div className="max-w-[150px] truncate" title={value as string}>
              {value as string}
            </div>
          )
        },
      })),
    ]
  }, [tableData])

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  const formSchema = useMemo(() => {
    const schemaFields: { [key: string]: z.ZodTypeAny } = {}
    schema
      .filter((col) => col.table_name === selectedTable)
      .forEach((col) => {
        if (col.column_name !== 'id' && !col.column_default) {
          schemaFields[col.column_name] =
            col.is_nullable === 'YES'
              ? z.string().optional()
              : z.string().min(1, { message: `${col.column_name} is required` })
        }
      })
    return z.object({
      ...schemaFields,
      styles: z.array(z.string()).optional(),
    })
  }, [schema, selectedTable])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category_id: '',
      license_id: '',
      storage_url: '',
      commentary: '',
      styles: [],
    },
  })

  const filteredCategories = useMemo(() => {
    return categories
  }, [categories])

  const filteredStyles = useMemo(() => {
    return styles
  }, [styles])

  const groupedCategories = useMemo(() => {
    return filteredCategories.reduce(
      (acc, category) => {
        if (!category.subcategory) {
          // If subcategory is empty, add the category directly to the root level
          acc[category.category] = [
            { id: category.id, label: category.category },
          ]
        } else {
          if (!acc[category.category]) {
            acc[category.category] = []
          }
          acc[category.category].push({
            id: category.id,
            label: category.subcategory,
          })
        }
        return acc
      },
      {} as Record<string, { id: number; label: string }[]>
    )
  }, [filteredCategories])

  const styleOptions = useMemo(() => {
    return filteredStyles.map((style) => ({
      id: style.id.toString(),
      label: style.style,
    }))
  }, [filteredStyles])

  const handleFontAnalysis = useCallback(
    (analysisResult: any) => {
      const processedFontName = analysisResult.fontFamily
        .replace(/Variable/g, '')
        .trim()
      form.setValue('name', processedFontName)

      const folderName = processedFontName.replace(/\s+/g, '_').toLowerCase()
      const fileName = analysisResult.originalFile.name
      const actualStoragePath = `${folderName}/${fileName}`
      const storageUrl = `${folderName}/${fileName}`

      form.setValue('storage_url', storageUrl)

      setAnalyzedFile({
        originalFile: analysisResult.originalFile,
        actualStoragePath: actualStoragePath,
      })

      // You might want to add more logic here to map other fields
      // For example, setting the license based on the analysis result
      const matchingLicense = licenses.find(
        (license) =>
          analysisResult.license &&
          license.license_type
            .toLowerCase()
            .includes(analysisResult.license.toLowerCase())
      )
      if (matchingLicense) {
        form.setValue('license_id', matchingLicense.id.toString())
      }

      // Set the commentary to include additional metadata
      const commentary = `
      Font Subfamily: ${analysisResult.fontSubfamily}
      Full Name: ${analysisResult.fullName}
      Version: ${analysisResult.version}
      Copyright: ${analysisResult.copyright}
      License: ${analysisResult.license}
    `.trim()
      form.setValue('commentary', commentary)
    },
    [form, licenses]
  )

  const renderFontsForm = () => {
    return (
      <>
        <FontAnalyzer
          onAnalysis={handleFontAnalysis}
          fontName={form.watch('name')}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(groupedCategories).map(([category, items]) =>
                    items.length === 1 && items[0].label === category ? (
                      <SelectItem
                        key={items[0].id}
                        value={items[0].id.toString()}
                      >
                        {category}
                      </SelectItem>
                    ) : (
                      <SelectGroup key={category}>
                        <SelectLabel>{category}</SelectLabel>
                        {items.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    )
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="license_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>License</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a license" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {licenses.map((license) => (
                    <SelectItem key={license.id} value={license.id.toString()}>
                      {license.license_type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="styles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Styles</FormLabel>
              <FormControl>
                <MultiSelect
                  options={styleOptions}
                  selectedOptions={selectedStyles}
                  onChange={(selected) => {
                    setSelectedStyles(selected)
                    field.onChange(selected)
                  }}
                  placeholder="Select styles"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="storage_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Storage URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="commentary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commentary</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    )
  }

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      setSubmitting(true)
      const { styles, ...font_data } = values

      try {
        if (!analyzedFile) {
          throw new Error('No font file analyzed')
        }

        // Upload file to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('webfonts')
          .upload(analyzedFile.actualStoragePath, analyzedFile.originalFile, {
            cacheControl: '3600',
            upsert: true,
          })

        if (uploadError) {
          throw new Error('Error uploading file')
        }

        // Get the public URL for the uploaded file
        const { data: publicUrlData } = supabase.storage
          .from('webfonts')
          .getPublicUrl(analyzedFile.actualStoragePath)

        // Use the public URL in the font data
        font_data.storage_url = publicUrlData.publicUrl

        // Insert or update font data
        const { data: fontResult, error: fontError } = await supabase
          .from('fonts')
          .upsert([font_data])
          .select()

        if (fontError) throw fontError

        const fontId = fontResult[0].id

        // Delete existing font_styles for this font
        await supabase.from('font_styles').delete().match({ font_id: fontId })

        // Insert new font_styles
        if (styles && styles.length > 0) {
          const fontStyles = styles.map((styleId: string) => ({
            font_id: fontId,
            style_id: parseInt(styleId),
          }))

          const { error: styleError } = await supabase
            .from('font_styles')
            .insert(fontStyles)

          if (styleError) throw styleError
        }

        toast({
          title: 'Success',
          description: `Font ${isEditMode ? 'updated' : 'added'} successfully`,
        })
        form.reset()
        fetchTableData('fonts')
        setIsEditMode(false)
        setRowSelection({})
        setSelectedStyles([])
        setAnalyzedFile(null)
      } catch (error) {
        toast({
          title: 'Error',
          description: `Failed to ${isEditMode ? 'update' : 'add'} font: ${error.message}`,
          variant: 'destructive',
        })
      }

      setSubmitting(false)
    },
    [isEditMode, form, analyzedFile, fetchTableData]
  )

  const handleEdit = useCallback(() => {
    const selectedRow = tableData.find((row, index) => rowSelection[index])
    if (selectedRow) {
      setIsEditMode(true)
      form.reset(selectedRow)

      // Fetch and set selected styles for the font
      const fetchFontStyles = async () => {
        const { data, error } = await supabase
          .from('font_styles')
          .select('style_id')
          .eq('font_id', selectedRow.id)

        if (!error && data) {
          const styleIds = data.map((item) => item.style_id.toString())
          setSelectedStyles(styleIds)
          form.setValue('styles', styleIds)
        }
      }

      fetchFontStyles()
    }
  }, [tableData, rowSelection, form])

  return (
    <div className="flex h-screen w-full flex-col lg:flex-row">
      {/* Left: Data Table (2/3 width) */}
      <div className="w-full overflow-auto p-2 lg:w-2/3">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Data Management</h2>
          <Select value={selectedTable} onValueChange={setSelectedTable}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select table" />
            </SelectTrigger>
            <SelectContent>
              {tableNames.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-150px)] w-full">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          className="font-geistMono text-xs"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
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
                        data-state={row.getIsSelected() && 'selected'}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className="font-geistMono text-xs"
                          >
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
                        className="h-24 text-center"
                      >
                        {loading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          'No results.'
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Right: Input Form (1/3 width) */}
      <div className="w-full overflow-auto p-2 lg:w-1/3">
        <Card className="h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              {isEditMode ? 'Edit' : 'Add New'}{' '}
              {selectedTable.charAt(0).toUpperCase() + selectedTable.slice(1)}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Switch
                checked={isEditMode}
                onCheckedChange={setIsEditMode}
                disabled={Object.keys(rowSelection).length === 0}
              />
              <span className="text-sm font-medium">
                {isEditMode ? 'Edit Mode' : 'Insert Mode'}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                {selectedTable === 'fonts'
                  ? renderFontsForm()
                  : schema
                      .filter(
                        (col) =>
                          col.table_name === selectedTable &&
                          col.column_name !== 'id' &&
                          !col.column_default
                      )
                      .map((col) => (
                        <FormField
                          key={col.column_name}
                          control={form.control}
                          name={col.column_name}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{col.column_name}</FormLabel>
                              <FormControl>
                                {col.data_type === 'text' &&
                                col.column_name === 'commentary' ? (
                                  <Textarea {...field} />
                                ) : (
                                  <Input {...field} />
                                )}
                              </FormControl>
                              <FormDescription className="text-xs">
                                {col.data_type}{' '}
                                {col.is_nullable === 'NO' ? '(required)' : ''}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                <div className="flex space-x-2">
                  <Button type="submit" disabled={submitting || !analyzedFile}>
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : isEditMode ? (
                      'Update'
                    ) : (
                      'Submit'
                    )}
                  </Button>
                  {isEditMode && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditMode(false)
                        form.reset()
                        setRowSelection({})
                        setSelectedStyles([])
                        setAnalyzedFile(null)
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
