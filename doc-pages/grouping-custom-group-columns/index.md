---
title: "Row Grouping - Custom Group Columns"
enterprise: true
---

This section covers how to take charge of displaying the row groups without using the built-in display types. 

[[note]]
| We advise against using your own group columns. Only do this if the Auto Group Columns do not meet your requirements. Otherwise defining your own group columns will add unnecessary complexity to your code.

When using the [Single Group Column](../grouping-single-group-column/), [Multiple Group Columns](../grouping-multiple-group-columns/)
and [Group Rows](../grouping-group-rows/) display types, the grid automatically adds Auto Group Columns to display the groups.

However, it is also possible to take control over which columns display which groups. This is useful if you want to have
a finer level of control over how your groups are displayed.

## Enabling Custom Group Columns

To display row groups using custom group columns set `groupDisplayType = 'custom'` as shown below:

<snippet spaceBetweenProperties="true">
const gridOptions = {
    columnDefs: [
        // Single Group Column (Custom)
        { 
            // group column name
            headerName: 'Group',
            // use the group cell render provided by the grid
            cellRenderer: 'agGroupCellRenderer', 
            // informs the grid to display row groups under this column
            showRowGroup: true 
        },
        // columns to group by
        { field: 'country', rowGroup: true, hide: true },
        { field: 'year', rowGroup: true, hide: true },
        { field: 'athlete' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' }
    ], 
    // prevents the grid from automatically adding group columns 
    groupDisplayType: 'custom',
};
</snippet>

Note in the snippet above that in order to make a column display a group, you need to configure the property 
`coldef.showRowGroup` for that column and can be configured in two different ways:

- To tell this column to show all the groups: `coldef.showRowGroup= true`
- To tell this column to show the grouping for a particular column. If you want to do this you need to know the `colId` of the column that you want to show the group by and set `coldef.showRowGroup= colId`

If you do specify `coldef.showRowGroup` you are going to also tell this column how to display the contents of this group, the easiest way to do this is by using the out of the box [group cell renderer](/cell-rendering/) `cellRenderer:'agGroupCellRenderer'`

This illustrates how to configure an specific column to show the groups generated by the country column

<snippet>
|const gridOptions = {
|    columnDefs: [
|        // The column we are grouping by, it is also hidden.
|        { field: "country", rowGroup: true, hide: true },
|
|        // We choose this column as the column to show the country groups.
|        { headerName: "Country - group", showRowGroup: 'country', cellRenderer: 'agGroupCellRenderer' },
|    ]
|}
</snippet>

Note that the group column needs an appropriate cell renderer, in this case the out-of-the-box group cell renderer is used.

The following example shows how to display all the groups in a single column

<grid-example title='Custom Grouping Single Group Column' name='custom-grouping-single-group-column' type='generated' options='{ "enterprise": true, "exampleHeight": 505, "modules": ["clientside", "rowgrouping"] }'></grid-example>

## Custom Grouping Many Group Columns

The following example shows how to appoint individual columns to show individual groups

<grid-example title='Custom Grouping Many Group Columns' name='custom-grouping-many-group-columns' type='generated' options='{ "enterprise": true, "exampleHeight": 515, "modules": ["clientside", "rowgrouping"] }'></grid-example>

## Custom Grouping Hidden Parents

The following example demonstrates hiding open parents using explicit group columns.

<grid-example title='Custom Grouping Hidden Parents' name='custom-grouping-hidden-parents' type='generated' options='{ "enterprise": true, "exampleHeight": 550, "modules": ["clientside", "rowgrouping"] }'></grid-example>

## Adding Values To Leaf Nodes for Groups

Adding leaf nodes data can also be achieved even if you provide your own group columns, this is illustrated in the following example. Note the following:

- The first column shows the Country group only. The `filterValueGetter` is configured to return the country so that country is used for filtering.
- The second columns shows Year (for group levels) and Athlete (for leaf levels). Because the field is set, the filter will use the field value for filtering.
- This is an example of a case where not using auto group columns lets us add custom different behaviour to each of the grouping columns.

<grid-example title='Adding Values To Leaf Nodes for Groups' name='adding-values-to-leaf-nodes-for-groups' type='generated' options='{ "enterprise": true, "exampleHeight": 515, "modules": ["clientside", "rowgrouping", "menu", "columnpanel", "setfilter"]}'></grid-example>

[[note]]
| Remember these examples are achieving the same that you can achieve with
| the auto groups columns, but their configuration is not as straight forward. We are keeping this for edge cases
| and for backwards compatibility for when we only supported this style of configuration.

## Next Up

Continue to the next section to learn about the [Row Group Panel](../grouping-group-panel/).