package com.washingtonpost.arc.ans.v0_3.model;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Paragraph" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestHeader extends AbstractANSTest<Header> {

    @Override
    String getSchemaName() {
        return "header";
    }

    @Override
    Class getTargetClass() {
        return Header.class;
    }

    @Test
    public void testGood() throws Exception {
        testJsonValidation("header-fixture-good", true);
        Header header = testClassSerialization("header-fixture-good");
        assertThat(header.getId(), is("0987654321"));
        assertThat(header.getType(), is("header"));
        assertThat(header.getText(), is("A New Deal"));
        assertThat(header.getLevel(), is(2));
    }

    @Test
    public void testBad() throws Exception {
        testJsonValidation("text-fixture-bad", false);
    }

}
