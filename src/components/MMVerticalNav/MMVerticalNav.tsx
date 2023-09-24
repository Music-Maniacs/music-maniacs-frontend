import React, { useState } from 'react';
import { styled } from 'styled-components';

const VerticalNavContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const VerticalSidenavContainer = styled.ul`
  display: flex;
  padding: 0px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-right: 3px solid var(--Modal-Background, #4e504e);
  margin: 0;
`;
const VerticalNavContentContainer = styled.div`
  padding: 10px;
`;
type Props = {
  Tabs: JSX.Element[];
  Content: JSX.Element[];
};
export const MMVerticalNav = ({ Tabs, Content }: Props) => {
  const [currentTab, setCurrentTab] = useState<string>(Tabs[0].props?.href?.split('#')[1] || '');

  const onTabChange = (href: string) => {
    setCurrentTab(href);
  };

  const renderTabs = () => {
    return Tabs.map((t, index) => {
      const href = t.props?.href?.split('#')[1];

      return (
        <div key={index} onClick={() => href && onTabChange(href)}>
          {href ? React.cloneElement(t, { active: currentTab === href }) : t}
        </div>
      );
    });
  };

  return (
    <VerticalNavContainer>
      <VerticalSidenavContainer>{renderTabs()}</VerticalSidenavContainer>
      <VerticalNavContentContainer>{Content.map((c) => c)}</VerticalNavContentContainer>
    </VerticalNavContainer>
  );
};
