import React from 'react';
import { MMBox } from '../MMBox/MMBox';
import { MMSubTitle } from '../MMTitle/MMTitle';
import { Version } from '../../models/Version';
import { StyledFlexColumn } from '../../styles/styledComponents';
import { VersionContent } from './VersionContent';

type Props = {
  versions: Version[];
  handleReportVersion?: (version: Version) => void;
  customClassName?: string;
};

export const VersionBox = ({ versions, customClassName, handleReportVersion }: Props) => {
  return (
    <MMBox className={`${customClassName ?? 'show-boxes'}`}>
      <MMSubTitle content="Versiones" />

      <StyledFlexColumn $gap="10px">
        {versions.map((version) => (
          <VersionContent key={version.id} version={version} handleReportVersion={handleReportVersion} />
        ))}
      </StyledFlexColumn>
    </MMBox>
  );
};
