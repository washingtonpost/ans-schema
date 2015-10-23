package com.washingtonpost.arc.ans.v0_3.model;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be arbitrary html serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestRawHTML extends AbstractANSTest<RawHTML> {

    @Override
    String getSchemaName() {
        return "raw_html";
    }

    @Override
    Class getTargetClass() {
        return RawHTML.class;
    }

    @Test
    public void testGood() throws Exception {
        testJsonValidation("raw-html-fixture-good", true);
        RawHTML html = testClassSerialization("raw-html-fixture-good");
        assertThat(html.getId(), is("09876543210"));
        assertThat(html.getType(), is("raw_html"));
        assertThat(html.getHTML(), is("<i>Here's my html</i>"));
    }

    @Test
    public void testBad() throws Exception {
        testJsonValidation("text-fixture-bad", false);
    }

}
