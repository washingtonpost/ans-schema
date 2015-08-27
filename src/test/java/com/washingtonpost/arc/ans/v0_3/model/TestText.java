package com.washingtonpost.arc.ans.v0_3.model;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Paragraph" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestText extends AbstractANSTest<Text> {
    
    @Override
    String getSchemaName() {
        return "text";
    }

    @Override
    Class getTargetClass() {
        return Text.class;
    }

    @Test
    public void testGood() throws Exception {
        testJsonValidation("text-fixture-good", true);
        Text text = testClassSerialization("text-fixture-good");
        assertThat(text.getId(), is("0987654321"));
        assertThat(text.getType(), is("text"));
        assertThat(text.getText(), is("<i>Here's my text</i>"));
    }

    @Test
    public void testBad() throws Exception {
        testJsonValidation("text-fixture-bad", false);
    }

}
