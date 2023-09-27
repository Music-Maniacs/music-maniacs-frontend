import React, { Fragment, useState } from 'react';
import { IconType } from 'react-icons/lib';
import { styled } from 'styled-components';
import { MMTab } from './MMTab';

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
  width: 100%;
`;
const VerticalSideavContentContainer = styled.div`
  width: 100%;
  display: none;
  &:target {
    display: block;
  }
`;
type Props = {
  Tabs: {
    href?: string;
    label?: string;
    Icon?: IconType;
    customTemplate?: JSX.Element;
  }[];
  Content: JSX.Element[];
};

export const MMVerticalNav = ({ Tabs, Content }: Props) => {
  const [currentTab, setCurrentTab] = useState<string>(Tabs[0]?.href?.split('#')[1] || '');

  const onTabChange = (href: string) => {
    setCurrentTab(href);
  };

  const renderTabs = () => {
    return Tabs.map((t, index) => {
      const href = t.href?.split('#')[1];

      return (
        <Fragment key={index}>
          {t.customTemplate ? (
            t.customTemplate
          ) : (
            <MMTab
              {...t}
              label={t.label ?? ''}
              active={currentTab === href}
              onClick={() => href && onTabChange(href)}
            />
          )}
        </Fragment>
      );
    });
  };

  return (
    <VerticalNavContainer>
      <VerticalSidenavContainer>{renderTabs()}</VerticalSidenavContainer>
      <VerticalNavContentContainer>
        {Content.map((c, i) => (
          <VerticalSideavContentContainer id={Tabs[i].href?.split('#')[1] || ''} key={`content-${i}`}>
            {c}
          </VerticalSideavContentContainer>
        ))}
      </VerticalNavContentContainer>
    </VerticalNavContainer>
  );
};
