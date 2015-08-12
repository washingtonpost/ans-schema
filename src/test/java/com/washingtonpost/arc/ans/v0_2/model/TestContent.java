package com.washingtonpost.arc.ans.v0_2.model;

import nl.jqno.equalsverifier.EqualsVerifier;
import nl.jqno.equalsverifier.Warning;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Content" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestContent extends AbstractTest<Content> {
    
    @Override
    String getSchemaName() {
        return "content";
    }

    @Override
    Class getTargetClass() {
        return Content.class;
    }

    @Test
    @Override
    public void testEqualsAndHashCode() {
        EqualsVerifier.forClass(getTargetClass())
                .suppress(Warning.STRICT_INHERITANCE, Warning.NONFINAL_FIELDS)
                .verify();
    }

    @Test
    public void testMediaGood() throws Exception {
        testJsonValidation("content-fixture-good", true);
        Content content = testClassSerialization("content-fixture-good");
        assertThat(content.getAdditionalProperties().get("foo"), is("bar"));
    }
}
