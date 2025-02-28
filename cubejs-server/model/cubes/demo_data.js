cube(`demo_data`, {
  sql_table: `public.demo_data`,

  data_source: `default`,

  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true
    },

    name: {
      sql: `name`,
      type: `string`
    },

    timestamp: {
      sql: `timestamp`,
      type: `time`
    }
  },

  measures: {
    // count: {
    //   type: `count`
    // },

    value: {
      sql: `value`,
      type: `sum` 
    }
  },

  pre_aggregations: {
    // Pre-aggregation definitions go here.
  }
});
