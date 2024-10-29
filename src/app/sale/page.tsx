import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import ProductSaleTable from '@/components/Tables/ProductSaleTable'
import React from 'react'

const Sale = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product Wise Sale" />
    
     <ProductSaleTable />
      
    </DefaultLayout>
  )
}

export default Sale