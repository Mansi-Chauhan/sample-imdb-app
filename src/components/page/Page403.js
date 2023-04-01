import React from 'react'
import {
  CCol,
  CContainer,
  CRow
} from '@coreui/react'

const Page403 = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <div className="clearfix">
              <h1 className="float-left display-3 mr-4">403</h1>
              <p className="text-muted float-left mt-5">Access Denied. Please contact admin.</p>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page403