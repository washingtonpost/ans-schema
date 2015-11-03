package com.washingtonpost.arc.ans.v0_3.model;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a blockquote serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestBlockquote extends AbstractANSTest<Blockquote> {

    @Override
    String getSchemaName() {
        return "blockquote";
    }

    @Override
    Class getTargetClass() {
        return Blockquote.class;
    }

    @Test
    public void testGood() throws Exception {
        testJsonValidation("bq-fixture-good", true);
        Blockquote bq = testClassSerialization("bq-fixture-good");
        assertThat(bq.getId(), is("49876543210"));
        assertThat(bq.getType(), is("blockquote"));
        assertThat(bq.getContent(), is("<i>Here's my html</i>"));
    }

    @Test
    public void testBad() throws Exception {
        testJsonValidation("bq-fixture-bad", false);
    }

}
