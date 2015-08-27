package com.washingtonpost.arc.ans.v0_3.model;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "ANS" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestANS extends AbstractTest<Content> {
    
    @Override
    String getSchemaName() {
        return "ans";
    }

    @Override
    Class getTargetClass() {
        return ANS.class;
    }

    @Test
    public void testAnsGood() throws Exception {
        testJsonValidation("ans-fixture-good", true);
        ANS ans = testClassSerialization("ans-fixture-good");
        assertThat(ans.getId(), is("1df3t8gh83gh72"));
        assertThat(ans.getType(), is("ans"));
    }

    @Test
    public void testAnsBad() throws Exception {
        testJsonValidation("ans-fixture-bad", false);
    }
}
