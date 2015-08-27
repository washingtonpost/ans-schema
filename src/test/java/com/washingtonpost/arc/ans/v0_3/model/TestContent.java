package com.washingtonpost.arc.ans.v0_3.model;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Content" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestContent extends AbstractANSTest<Content> {
    
    @Override
    String getSchemaName() {
        return "content";
    }

    @Override
    Class getTargetClass() {
        return Content.class;
    }

    @Test
    public void testMediaGood() throws Exception {
        testJsonValidation("content-fixture-good", true);
        Content content = testClassSerialization("content-fixture-good");
        assertThat(content.getAdditionalProperties().get("foo"), is("bar"));
    }
}
