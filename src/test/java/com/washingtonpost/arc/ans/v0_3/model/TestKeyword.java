package com.washingtonpost.arc.ans.v0_3.model;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Keyword" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestKeyword extends AbstractTest<Keyword> {
    
    @Override
    String getSchemaName() {
        return "keyword";
    }

    @Override
    Class getTargetClass() {
        return Keyword.class;
    }

    @Test
    public void testKeywordGood() throws Exception {
        testJsonValidation("keyword-fixture-good", true);
        Keyword keyword = testClassSerialization("keyword-fixture-good");
        assertThat(keyword.getKeyword(), is("Anesthesiologist"));
        assertThat(keyword.getFrequency(), is(2));
        assertThat(keyword.getScore(), is(0.77));
    }

    @Test
    public void testKeywordBadNumericFrequency() throws Exception {
        testJsonValidation("keyword-fixture-bad-numeric-frequency", false);
    }
}
