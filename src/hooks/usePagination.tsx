interface Props {
    count: number
    defaultPage?: number
    onChange: () => void
    page: number
    siblingCount: number
}
export function usePagination({ count, page, siblingCount, ...props }: Props) {
    const range = (start: number, end: number): number[] => {
        const length = end - start + 1
        return Array.from({ length }, (_, i) => start + i)
    }

    const startPages = range(1, 1)
    const endPages = range(count, count)

    const siblingsStart = Math.max(page - siblingCount, 3)
    const siblingsEnd = Math.min(siblingsStart + 2, count - 1)

    // Basic list of items to render
    // for example itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
    console.log(siblingsStart)
    console.log(siblingsEnd)
    const items = [
        ...startPages,
        siblingsStart < page ? 'start-ellipsis' : startPages[0] + 1,
        ...range(siblingsStart, siblingsEnd),
        ...(siblingsEnd > page ? ['ellipsis'] : []),
        ...endPages
    ]

    console.log(items)

    // console.log(endPages)
    // console.log(siblingsStart)
    // console.log(endPages)
}
// interface Props {
//     boundaryCount: number
//     count: number
//     defaultPage: number
//     disabled: boolean
//     hideNextButton: boolean
//     hidePrevButton: boolean
//     onChange: () => void
//     page: any
//     siblingCount: number
// }
// export default function usePagination({ ...props }: Props) {
//     // keep default values in sync with @default tags in Pagination.propTypes

//     const handleClick = (event: any, value: any) => {
//         //   if (!pageProp) {
//         //     setPageState(value);
//         //   }
//         //   if (handleChange) {
//         //     handleChange(event, value);
//         //   }
//     }

//     // https://dev.to/namirsab/comment/2050
//     const range = (start: number, end: number): number[] => {
//         const length = end - start + 1
//         return Array.from({ length }, (_, i) => start + i)
//     }

//     const startPages = range(1, Math.min(props.boundaryCount, props.count))
//     const endPages = range(Math.max(props.count - props.boundaryCount + 1, props.boundaryCount + 1), props.count)

//     const siblingsStart = Math.max(
//         Math.min(
//             // Natural start
//             props.page - props.siblingCount,
//             // Lower boundary when page is high
//             props.count - props.boundaryCount - props.siblingCount * 2 - 1
//         ),
//         // Greater than startPages
//         props.boundaryCount + 2
//     )

//     const siblingsEnd = Math.min(
//         Math.max(
//             // Natural end
//             props.page + props.siblingCount,
//             // Upper boundary when page is low
//             props.boundaryCount + props.siblingCount * 2 + 2
//         ),
//         // Less than endPages
//         props.count - props.boundaryCount - 1
//     )

//     // Basic list of items to render
//     // for example itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
//     const itemList = [
//         ...(props.hidePrevButton ? [] : ['previous']),
//         ...startPages,

//         // Start ellipsis
//         ...(siblingsStart > props.boundaryCount + 2
//             ? ['start-ellipsis']
//             : props.boundaryCount + 1 < props.count - props.boundaryCount
//             ? [props.boundaryCount + 1]
//             : []),

//         // Sibling pages
//         ...range(siblingsStart, siblingsEnd),

//         // End ellipsis
//         ...(siblingsEnd < props.count - props.boundaryCount - 1
//             ? ['end-ellipsis']
//             : props.count - props.boundaryCount > props.boundaryCount
//             ? [props.count - props.boundaryCount]
//             : []),

//         ...endPages,
//         ...(props.hideNextButton ? [] : ['next'])
//     ]
//     console.log(itemList)

//     // Map the button type to its page number
//     const buttonPage = (type: any) => {
//         switch (type) {
//             case 'first':
//                 return 1
//             case 'previous':
//                 return props.page - 1
//             case 'next':
//                 return props.page + 1
//             case 'last':
//                 return props.count
//             default:
//                 return null
//         }
//     }

//     // Convert the basic item list to PaginationItem props objects
//     const items = itemList.map((item) => {
//         return typeof item === 'number'
//             ? {
//                   onClick: (event: any) => {
//                       handleClick(event, item)
//                   },
//                   type: 'page',
//                   page: item,
//                   selected: item === props.page,
//                   disabled: props.disabled,
//                   'aria-current': item === props.page ? 'true' : undefined
//               }
//             : {
//                   onClick: (event: any) => {
//                       handleClick(event, buttonPage(item))
//                   },
//                   type: item,
//                   page: buttonPage(item),
//                   selected: false,
//                   disabled:
//                       props.disabled ||
//                       (!item.includes('ellipsis') &&
//                           (item === 'next' || item === 'last' ? props.page >= props.count : props.page <= 1))
//               }
//     })

//     return {
//         items
//     }
// }
