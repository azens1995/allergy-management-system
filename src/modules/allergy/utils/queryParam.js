const SORT_QUERY = {
  NAME_ASC: 'name',
  NAME_DSC: '-name',
  SEVERITY_ASC: 'severity',
  SEVERITY_DSC: '-severity',
  HIGH_RISK_ASC: 'highRisk',
  HIGH_RISK_DSC: '-highRisk',
  CREATED_ASC: 'createdAt',
  CREATED_DSC: '-createdAt',
};

const SORT_ORDER = {
  ASC: 'ASC',
  DSC: 'DESC',
};

const COLUMNS = {
  NAME: 'name',
  SEVERITY: 'severity',
  HIGH_RISK: 'isHighRisk',
  CREATED: 'createdAt',
};

const getSortOrder = (sort) => {
  switch (sort) {
    case SORT_QUERY.NAME_ASC:
      return [COLUMNS.NAME, SORT_ORDER.ASC];
    case SORT_QUERY.NAME_DSC:
      return [COLUMNS.NAME, SORT_ORDER.DSC];

    case SORT_QUERY.SEVERITY_ASC:
      return [COLUMNS.SEVERITY, SORT_ORDER.ASC];
    case SORT_QUERY.SEVERITY_DSC:
      return [COLUMNS.SEVERITY, SORT_ORDER.DSC];

    case SORT_QUERY.HIGH_RISK_ASC:
      return [COLUMNS.HIGH_RISK, SORT_ORDER.ASC];
    case SORT_QUERY.HIGH_RISK_DSC:
      return [COLUMNS.HIGH_RISK, SORT_ORDER.DSC];

    case SORT_QUERY.CREATED_ASC:
      return [COLUMNS.CREATED, SORT_ORDER.ASC];
    case SORT_QUERY.CREATED_DSC:
      return [COLUMNS.CREATED, SORT_ORDER.DSC];

    default:
      return [COLUMNS.CREATED, SORT_ORDER.DSC];
  }
};

module.exports = {
  getSortOrder,
  COLUMNS,
  SORT_ORDER,
};
