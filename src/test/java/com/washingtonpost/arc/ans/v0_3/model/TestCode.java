package com.washingtonpost.arc.ans.v0_3.model;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Code Sample" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestCode extends AbstractANSTest<Code> {

    @Override
    String getSchemaName() {
        return "code";
    }

    @Override
    Class getTargetClass() {
        return Code.class;
    }

    @Test
    public void testGood() throws Exception {
        testJsonValidation("code-fixture-good", true);
        Code code = testClassSerialization("code-fixture-good");
        assertThat(code.getId(), is("0987654321"));
        assertThat(code.getType(), is("code"));
        assertThat(code.getCode(), is("var x = \"foo\";\nconsole.log(\"foo\");"));
        assertThat(code.getLanguage(), is("javascript"));
    }

    @Test
    public void testBad() throws Exception {
        testJsonValidation("text-fixture-bad", false);
    }

}
