import { Box, Tabs, Tab } from '@mui/material'
import { useState } from 'react'

interface CustomTabsProps {
  name: string
  items: {
    label: string
    content: React.ReactNode
  }[]
}

const CustomTabs = ({ name, items }: CustomTabsProps) => {
  const [currentTab, setCurrentTab] = useState(0)

  const handleChange = (_: unknown, newValue: number) => {
    setCurrentTab(newValue)
  }

  return (
    <>
      <Box marginBottom='1.25rem'>
        <Tabs value={currentTab} onChange={handleChange}>
          {items.map((item, index) => (
            <Tab
              key={`item.label-${index}`}
              label={item.label}
              id={`${name}-tab-${item.label}`}
              aria-controls={`${name}-tabpanel-${item.label}`}
            />
          ))}
        </Tabs>
      </Box>
      {items.map((item, index) => (
        <div
          key={`item.tabpanel-${index}`}
          role='tabpanel'
          hidden={currentTab !== index}
          id={`${name}-tabpanel-${item.label}`}
          aria-labelledby={`${name}-tab-${item.label}`}
        >
          {currentTab === index && <Box>{item.content}</Box>}
        </div>
      ))}
    </>
  )
}

export default CustomTabs
