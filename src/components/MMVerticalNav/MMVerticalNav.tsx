import React, { Fragment, useState } from 'react';
import { IconType } from 'react-icons/lib';
import { styled } from 'styled-components';
import { MMColors } from '../../models/Generic';
import breakpoints from '../../styles/_breakpoints.scss';
import { MMTab } from './MMTab';
import { IconBaseProps } from 'react-icons';

const VerticalNavContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  @media screen and (max-width: ${breakpoints.sm}) {
    flex-direction: column;
  }
`;

const VerticalSidenavContainer = styled.ul`
  display: flex;
  padding: 0px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-right: 3px solid var(--highlight);
  margin: 0;
  @media screen and (max-width: ${breakpoints.sm}) {
    border-bottom: 3px solid var(--highlight);
    border-right: none;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 0px;
  }
  @media screen and (max-width: ${breakpoints.md}) {
    gap: 13px;
  }
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

export type MMNavTabProps = {
  href?: string;
  label?: string;
  Icon?: IconType | ((props: IconBaseProps) => JSX.Element);
  chip?: {
    color?: MMColors;
    value: number;
  };
  id?: string;
  customTemplate?: JSX.Element;
};
export type MMVerticalNavProps = {
  Tabs: MMNavTabProps[];
  Content: JSX.Element[];
};

export const MMVerticalNav = ({ Tabs, Content }: MMVerticalNavProps) => {
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
              id={t.id}
              chip={t.chip}
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
