import Loader from 'react-loader-spinner';
import styled from 'styled-components';

export default function Table ({
  columns = [],
  content = [],
  onCellClick = {},
  formatCellText = {},
  cellStyle = {},
  actions = [],
  isLoading = false,
  height = '700px'
}) {
  if (isLoading) return (
    <Loader type="ThreeDots" color="var(--colors-main)" height={40} width={40} />
  );

  return (
    <Container>
      <StyledTable height={height}>
        <thead>
          <tr>
            {
              columns.map((column, i) => <th key={i}>{column.title}</th>)
            }

            {
              actions.map((action, i) => <th key={i + columns.length}>{action.title}</th>)
            }
          </tr>
        </thead>

        <tbody>
          {
            content.map(row => (
              <tr key={row.id}>
                {
                  columns.map((column, i) => (
                    <td 
                      key={i}
                      {...{
                        ...(onCellClick[column.accessor] && {
                          onClick: () => onCellClick[column.accessor](row),
                          className: 'clickable'
                        })
                      }}
                      style={cellStyle[column.accessor] ? cellStyle[column.accessor](row[column.accessor], row) || {} : {}}
                    >
                      {
                        formatCellText[column.accessor]
                        ? formatCellText[column.accessor](traverseObjectFromString(row, column.accessor), row)
                        : traverseObjectFromString(row, column.accessor)
                      }
                    </td>
                  ))
                }

                {
                  actions.map((action, i) => (
                    <td onClick={() => action.onClick(row)} key={i + columns.length}>
                      {
                        action.component
                      }
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </StyledTable>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-height: ${props => props.height};
  overflow: auto;
  border-radius: 9px;
  position: relative;
  z-index: 1;
`;

const StyledTable = styled.table`
  width: 100%;

  tr {
    border-bottom: 1px solid #EEE;

    &:nth-child(even) {
      background-color: #F7F7F7;
    }

    &:nth-child(odd) {
      background-color: #FFFFFF;
    }
  }

  td, th {
    vertical-align: middle;
    padding: 20px 0;
    text-align: center;
    &.clickable {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .05) 2%, rgba(0, 0, 0, .05) 98%, rgba(0, 0, 0, 0) 100%);
      }
    }
  }

  thead {
    position: sticky;
    top: -0.5px;

    font-weight: bold;
    text-transform: uppercase;
    border-top: 1px solid #EEE;

    tr:nth-child(odd) {
      background-color: slateblue;
      color: #FFF;
    }
  }

  tbody tr:hover {
    filter: brightness(0.92);
  }

  img {
    width: 80px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
  }
`;

function traverseObjectFromString (o, s) {
  s = s.replace(/\[(\w+)\]/g, '.$1');
  s = s.replace(/^\./, '');

  const a = s.split('.');

  for (let i = 0, n = a.length; i < n; ++i) {
      const k = a[i];
      if (k in o) {
          o = o[k];
      } else {
          return;
      }
  }

  return o;
}
