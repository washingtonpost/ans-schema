package com.washingtonpost.arc.ans.v0_3.model;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Table Sample" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestTable extends AbstractANSTest<Table> {

    @Override
    String getSchemaName() {
        return "table";
    }

    @Override
    Class getTargetClass() {
        return Table.class;
    }

    @Test
    public void testGood() throws Exception {
        testJsonValidation("table-fixture-good", true);
        Table table = testClassSerialization("table-fixture-good");
        assertThat(table.getId(), is("0987654321"));
    }

    @Test
    public void testBad() throws Exception {
        testJsonValidation("text-fixture-bad", false);
    }

}
