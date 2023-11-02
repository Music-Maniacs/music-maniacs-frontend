import { Tab, Tabs } from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';

type Props = {
  items: {
    label: string;
    content: () => JSX.Element;
  }[];
};

export const Navtab = ({ items }: Props) => {
  const [tabValue, setTabValue] = useState<number>(0);

  const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" allowScrollButtonsMobile>
        {items.map((item, index) => (
          <Tab key={index} value={index} label={item.label} />
        ))}
      </Tabs>

      {items.map((item, index) => (
        <TabContentContainer key={index} currIndex={tabValue} value={index}>
          <item.content />
        </TabContentContainer>
      ))}
    </>
  );
};

interface TabContenyProps {
  children: React.ReactNode;
  currIndex: number;
  value: number;
}

const TabContentContainer = ({ children, currIndex, value }: TabContenyProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== currIndex}
      id={`tabpanel-${currIndex}`}
      aria-labelledby={`simple-tab-${currIndex}`}
    >
      {value === currIndex && <div>{children}</div>}
    </div>
  );
};
