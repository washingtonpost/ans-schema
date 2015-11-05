package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jackson.JsonLoader;
import com.github.fge.jsonschema.core.exceptions.ProcessingException;
import com.github.fge.jsonschema.core.report.ProcessingReport;
import com.github.fge.jsonschema.main.JsonSchema;
import com.github.fge.jsonschema.main.JsonSchemaFactory;
import java.io.IOException;
import java.net.URL;
import nl.jqno.equalsverifier.EqualsVerifier;
import nl.jqno.equalsverifier.Warning;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.hamcrest.MatcherAssert.assertThat;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import static org.junit.Assert.fail;
import org.junit.Before;
import org.junit.Test;

/**
 * <p>Helper/common methods for JSON schema/test validation</p>
 * @param <T> The type of POJO the implementing test class is stressing the JSON (de)serialization of.
 */
public abstract class AbstractTest<T> {

    protected static final Logger LOGGER = LoggerFactory.getLogger(AbstractTest.class);
    private final JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
    private JsonSchema schema;
    protected final ObjectMapper objectMapper = new ObjectMapper();


    /**
     * @param resourcePath THe path to the resource to load
     * @return
     * @throws IOException
     */
    URL getResource(String resourcePath) throws IOException {
        return getClass().getClassLoader().getResource(resourcePath);
    }

    /**
     * @param fixtureName The name of the fixture in the same path as the test being executed, e.g. "credit".
     * @return
     * @throws IOException
     */
    URL getSisterPathResource(String fixtureName) throws IOException {
        return getResource(getClass().getPackage().getName().replace(".", "/") + "/" + fixtureName + ".json");
    }

    /**
     * @param fixtureName The name of the fixture in the same path as the test being executed, e.g. "credit".
     * @return
     * @throws IOException
     */
    JsonNode loadFixture(String fixtureName) throws IOException {
        return JsonLoader.fromPath(getSisterPathResource(fixtureName).getFile());
    }

    /**
     * @param schemaName The name of the schema to load, e.g. "credit".  This method assumes the schemas
     * live under a classpath resource schema/ans/v0_X/
     * @return
     * @throws IOException
     */
    JsonNode loadSchema(String schemaName) throws IOException {
        // Turns "com.washingtonpost.arc.ans.v0_x.model" into "schema/ans/v0_3/"
        String schemaResourceDir = getClass().getPackage().getName()
                .replace(".", "/")
                .replace("com/washingtonpost/arc", "schema")
                .replace("model", "");
        return JsonLoader.fromPath(getResource(schemaResourceDir + schemaName + ".json").getFile());
    }

    /**
     * Each test case in our subclass children will use the same schema, so there's only cause to
     * load it once, which we'll do before the test.
     * @throws ProcessingException
     * @throws IOException
     */
    @Before
    public void loadSchemaForTests() throws ProcessingException, IOException {
        this.schema = factory.getJsonSchema(loadSchema(getSchemaName()));
    }

    /**
     * <p>Loads a JSON schema file from the classpath file found at getSchemaName() (as implemented by our subclass), then
     * uses that schema to validate a fixture file, checking that it passes/fails depending on the value of {@code expected}</p>
     * @param fixture The fixture file to validate against the schema pointed to by getSchemaName()
     * @param expected Whether or not you expect {@code} fixture to pass
     * @throws Exception
     */
    void testJsonValidation(String fixture, boolean expected) throws Exception {
        ProcessingReport report = schema.validate(loadFixture(fixture));
        if (expected != report.isSuccess()) {
            LOGGER.info("{} report = {}", fixture, report);
            fail(String.format("%s %s against %s schema", 
                    fixture,
                    (expected ? "did not validate" : "validated"),
                    getSchemaName()));
        }
    }

    @SuppressWarnings("unchecked")
    T testClassSerialization(String fixture) throws Exception {
        URL url = getSisterPathResource(fixture);
        return (T)objectMapper.readValue(url, getTargetClass());
    }

    /**
     * This tests that the .equals() and .hashCode() method of our classes all work as per the contract
     */
    @Test
    @SuppressWarnings("unchecked")
    public void testEqualsAndHashCode() {
        if (!getTargetClass().isInterface()) {
            EqualsVerifier.forClass(getTargetClass())
                    .suppress(Warning.STRICT_INHERITANCE, Warning.NONFINAL_FIELDS)
                    .verify();
        }
    }

    /**
     * @throws InstantiationException
     * @throws java.lang.IllegalAccessException
     */
    @Test
    public void testToString() throws InstantiationException, IllegalAccessException {
        if (!getTargetClass().isInterface()) {
            assertThat(getTargetClass().newInstance().toString(), is(not(nullValue())));
        }
    }

    /**
     * @return The name of the schema file in src/main/resources/schema/ans/v0_2/ you want to load when validating a
     * schema via the {@code runTest(String, boolean)} method
     */
    abstract String getSchemaName();

    /**
     * @return The class that a fixture should be able to be serialized into
     */
    abstract Class getTargetClass();
}
