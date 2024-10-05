'use client'

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface PaginationControlsProps {
  hasNextPage: boolean
  hasPrevPage: boolean
  totalPosts: number // اضافه کردن پروپ برای تعداد کل پست‌ها
  perPage: number // اضافه کردن پروپ برای تعداد پست‌ها در هر صفحه
}

const PaginationControls: FC<PaginationControlsProps> = (
  {
    hasNextPage,
    hasPrevPage,
    totalPosts, // دریافت تعداد کل پست‌ها
    perPage, // دریافت تعداد پست‌ها در هر صفحه
  }
) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get('page')) || 1
  const totalPages = Math.ceil(totalPosts / perPage) // محاسبه تعداد کل صفحات

  return (
    <div className='flex gap-2'>
      <button
        className='bg-blue-500 text-white p-1'
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/?page=${page - 1}&per_page=${perPage}`)
        }}>
        prev page
      </button>

      <div>
        {page} / {totalPages}
      </div>

      <button
        className='bg-blue-500 text-white p-1'
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/?page=${page + 1}&per_page=${perPage}`)
        }}>
        next page
      </button>
    </div>
  )
}

export default PaginationControls
